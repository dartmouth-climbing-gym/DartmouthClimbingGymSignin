/**
 * src/services/sessions.ts
 *
 * Services for managing user sessions in the Dartmouth Climbing Gym website.
 */
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { getName } from "./waivers";

const USAGE_LOG_REF = "usage_log";
const PUBLIC_REF = "public";

async function removeFromPublic(timein: number): Promise<void> {
  const snap = await getDocs(query(collection(db, PUBLIC_REF), where("signin", "==", timein)));
  if (!snap.empty) {
    await deleteDoc(snap.docs[0].ref);
  }
}

async function createSession(netid: string, time: number): Promise<void> {
  await addDoc(collection(db, USAGE_LOG_REF), { netid, signin: time, signout: 0 });
  await addDoc(collection(db, PUBLIC_REF), { signin: time });
}

export async function signInOut(netid: string): Promise<{ success: boolean; message: string }> {
  const name = await getName(netid);
  if (!name) {
    return { success: false, message: "Please sign the waiver first!" };
  }

  const time = Date.now();
  const snap = await getDocs(
    query(collection(db, USAGE_LOG_REF), where("netid", "==", netid), where("signout", "==", 0)),
  );

  if (snap.empty) {
    await createSession(netid, time);
    return { success: true, message: "Signed in!" };
  }

  await Promise.all(
    snap.docs.map(async (d) => {
      await updateDoc(d.ref, { signout: time });
      await removeFromPublic((d.data() as { signin: number }).signin);
    }),
  );
  return { success: true, message: "Signed out!" };
}

export async function signOutIndividual(netid: string, timein: number): Promise<void> {
  const time = Date.now();
  const snap = await getDocs(
    query(
      collection(db, USAGE_LOG_REF),
      where("netid", "==", netid),
      where("signin", "==", timein),
      where("signout", "==", 0),
    ),
  );

  if (snap.empty) throw new Error(`No active session found for ${netid}`);

  await Promise.all(snap.docs.map((d) => updateDoc(d.ref, { signout: time })));
  await removeFromPublic(timein);
}

export async function signOutAll(): Promise<void> {
  const time = Date.now();
  const [publicSnap, usageSnap] = await Promise.all([
    getDocs(collection(db, PUBLIC_REF)),
    getDocs(query(collection(db, USAGE_LOG_REF), where("signout", "==", 0))),
  ]);

  await Promise.all([
    ...publicSnap.docs.map((d) => deleteDoc(d.ref)),
    ...usageSnap.docs.map((d) => updateDoc(d.ref, { signout: time })),
  ]);
}
