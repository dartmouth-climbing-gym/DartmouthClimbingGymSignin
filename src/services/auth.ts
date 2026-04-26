/**
 * src/services/auth.ts
 *
 * Authentication services for the Dartmouth Climbing Gym website.
 *
 * The admin login essentially just checks if the provided password is correct,
 * without maintaining any session state or tokens. This is because the admin
 * page is only used for a few sensitive operations (like resetting the waiver
 * database) and is not a full-fledged dashboard with persistent login.
 *
 * If the password is correct, the user is considered authenticated for the
 * duration of their visit to the admin page, but there are no cookies or
 * tokens set, and no authentication state is stored on the client or server.
 */

import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export async function anonymousLogin(): Promise<void> {
  await signInAnonymously(auth);
}

const ADMIN_EMAIL = "climbinggym@dartmouth.edu";

export async function adminLogin(pw: string): Promise<{ ok: boolean }> {
  try {
    await signInWithEmailAndPassword(auth, ADMIN_EMAIL, pw);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
