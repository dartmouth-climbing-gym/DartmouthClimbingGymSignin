/**
 * src/services/capacity.ts
 *
 * Services for managing the climbing gym's capacity. This includes functions
 * to get the current capacity and subscribe to capacity changes in real-time.
 */
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const PUBLIC_REF = "public";

export async function getCurrentCapacity(): Promise<number> {
  const snap = await getDocs(collection(db, PUBLIC_REF));
  return snap.size;
}

export function subscribeToCapacity(callback: (count: number) => void): () => void {
  return onSnapshot(collection(db, PUBLIC_REF), (snap) => {
    callback(snap.size);
  });
}
