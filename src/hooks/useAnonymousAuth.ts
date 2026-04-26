/**
 * src/hooks/useAnonymousAuth.ts
 *
 * This hook manages anonymous authentication using Firebase Auth. It listens
 * for authentication state changes and provides the current user and loading
 * status.
 */
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { anonymousLogin } from "../services/auth";
import { auth } from "../lib/firebase";

export default function useAnonymousAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    anonymousLogin().catch(() => {});

    return unsubscribe;
  }, []);

  return { user, loading };
}
