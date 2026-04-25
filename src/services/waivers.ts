/**
 * src/services/waivers.ts
 *
 * Services for managing waivers in the Dartmouth Climbing Gym website.
 */
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const USERS_REF = "users";

const VALIDATORS: Record<"netID" | "email", RegExp> = {
  netID: /^[fd][0-9a-zA-Z]{6}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export function validateInput(category: "netID" | "email", id: string): boolean {
  return VALIDATORS[category].test(id);
}

export async function getName(netid: string): Promise<string | null> {
  const snap = await getDoc(doc(db, USERS_REF, netid));
  return snap.exists() ? (snap.data() as { name: string }).name : null;
}

export async function signWaiver(
  category: "netID" | "email",
  id: string,
  name: string,
): Promise<{ success: boolean; message: string }> {
  const ref = doc(db, USERS_REF, id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { success: false, message: "Waiver already signed." };
  }
  await setDoc(ref, { id, name, category });
  return { success: true, message: "Waiver signed successfully!" };
}
