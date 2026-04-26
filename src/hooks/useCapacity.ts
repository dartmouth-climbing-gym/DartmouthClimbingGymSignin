/**
 * src/hooks/useCapacity.ts
 *
 * This hook listens to the "capacity" collection in Firestore and returns the
 * current capacity of the climbing gym.
 */
import { useEffect, useState } from "react";
import { subscribeToCapacity } from "../services/capacity";

export default function useCapacity() {
  const [capacity, setCapacity] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCapacity(setCapacity);
    return unsubscribe;
  }, []);

  return capacity;
}
