/**
 * src/hooks/useActiveClimbers.ts
 *
 * This hook listens to the "usage_log" collection in Firestore and returns an
 * array of climber sessions where the "signout" field is equal to 0,
 * indicating that the climber is currently active.
 */

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import type { ClimberSession } from "../types";

export default function useActiveClimbers() {
  const [climbers, setClimbers] = useState<ClimberSession[]>([]);

  useEffect(() => {
    const q = query(collection(db, "usage_log"), where("signout", "==", 0));
    const unsubscribe = onSnapshot(q, (snap) => {
      setClimbers(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ClimberSession, "id">),
        })),
      );
    });

    return unsubscribe;
  }, []);

  return climbers;
}
