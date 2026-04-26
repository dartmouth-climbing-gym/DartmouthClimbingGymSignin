/**
 * src/components/LoginGate.tsx
 *
 * Login gate component for the Dartmouth Climbing Gym admin dashboard.
 * Displays a password prompt and calls the provided `onAuth` callback if the
 * correct password is entered.
 */

import { useState } from "react";
import { adminLogin } from "../services/auth";

export default function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const result = await adminLogin(pw);
    setLoading(false);
    if (result.ok) {
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-7">
          <img src="/media/climbing-gym-logo.png" alt="Dartmouth Climbing Gym" className="w-20" />

          <div className="text-center">
            <p className="font-jost text-xs font-semibold uppercase tracking-widest text-dartmouth-green">
              Staff Access
            </p>

            <h1 className="mt-1 font-anton text-4xl uppercase text-forest-green sm:text-5xl">
              Admin
            </h1>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-spring-green" />
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              disabled={loading}
              autoComplete="current-password"
              className={`w-full rounded-xl border-2 px-5 py-4 text-center font-jost text-xl text-forest-green placeholder-surface-secondary focus:outline-none disabled:opacity-50 ${
                error
                  ? "border-red-300 bg-red-50 focus:border-red-400"
                  : "border-surface bg-background focus:border-dartmouth-green"
              }`}
            />

            {error && (
              <p className="text-center font-jost text-sm text-red-500">Incorrect password</p>
            )}

            <button
              type="submit"
              disabled={loading || !pw}
              className="w-full rounded border-2 border-dartmouth-green bg-dartmouth-green py-4 font-jost text-xl font-semibold text-white transition-all duration-150 hover:bg-transparent hover:text-dartmouth-green disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
