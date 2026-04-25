/**
 * src/services/auth.ts
 *
 * Authentication services for the Dartmouth Climbing Gym website.
 */

import { signInAnonymously } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function anonymousLogin(): Promise<void> {
  await signInAnonymously(auth);
}

export async function adminLogin(pw: string): Promise<boolean> {
  const snap = await getDoc(doc(db, "admin", "identification"));
  if (!snap.exists()) return false;
  return (snap.data() as { pw: string }).pw === pw;
}
