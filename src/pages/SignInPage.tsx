/**
 * src/pages/SignInPage.tsx
 * 
 * Sign in/out page for the Dartmouth Climbing Gym website.
 */

import { useEffect, useRef, useState } from "react";
import { getName } from "../services/waivers";
import { signInOut } from "../services/sessions";
import WaiverLink from "../components/WaiverLink";

type Status = "idle" | "submitting" | "signed-in" | "signed-out" | "error";

const RESET_DELAY_MS = 1000;

export default function SignInPage() {
  const [netid, setNetid] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [climberName, setClimberName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function reset() {
    setNetid("");
    setStatus("idle");
    setClimberName("");
    setErrorMsg("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (status === "signed-in" || status === "signed-out") {
      timerRef.current = setTimeout(reset, RESET_DELAY_MS);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = netid.trim().toLowerCase();
    if (!trimmed) return;

    setStatus("submitting");

    const name = await getName(trimmed);
    const result = await signInOut(trimmed);

    if (!result.success) {
      setStatus("error");
      setErrorMsg(result.message);
      return;
    }

    setClimberName(name ?? trimmed);
    setStatus(result.message === "Signed in!" ? "signed-in" : "signed-out");
  }

  const isSubmitting = status === "submitting";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-7">

          {/* Logo */}
          <img
            src="/media/climbing-gym-logo.png"
            alt="Dartmouth Climbing Gym"
            className="w-20"
          />

          {/* Success state */}
          {(status === "signed-in" || status === "signed-out") && (
            <div className="flex w-full flex-col items-center gap-4 text-center animate-fade-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-spring-green">
                <svg
                  className="h-8 w-8 text-forest-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <p className="font-anton text-4xl uppercase text-forest-green">
                  {status === "signed-in" ? "Welcome!" : "See you!"}
                </p>
                <p className="mt-1 font-jost text-xl text-dartmouth-green">{climberName}</p>
              </div>

              <p className="font-jost text-sm text-surface-secondary">
                {status === "signed-in" ? "Signed in" : "Signed out"} · Resetting in a moment…
              </p>
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="flex w-full flex-col items-center gap-5 text-center animate-fade-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-200">
                <svg
                  className="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div>
                <p className="font-anton text-3xl uppercase text-forest-green">Hold on</p>
                <p className="mt-1 font-jost text-base text-surface-secondary">{errorMsg}</p>
              </div>

              <div className="flex w-full flex-col gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded border-2 border-dartmouth-green bg-dartmouth-green py-4 font-jost text-lg font-semibold text-white transition-all duration-150 hover:bg-transparent hover:text-dartmouth-green"
                >
                  Try Again
                </button>

                <WaiverLink />
              </div>
            </div>
          )}

          {/* Idle / submitting form */}
          {(status === "idle" || status === "submitting") && (
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-5">
              <div className="text-center">
                <p className="font-jost text-xs font-semibold uppercase tracking-widest text-dartmouth-green">
                  Dartmouth Climbing Gym
                </p>

                <h1 className="mt-1 font-anton text-4xl uppercase text-forest-green sm:text-5xl">
                  Sign In / Out
                </h1>

                <div className="mx-auto mt-3 h-0.5 w-10 bg-spring-green" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={netid}
                onChange={(e) => setNetid(e.target.value)}
                placeholder="Enter NetID"
                disabled={isSubmitting}
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-xl border-2 border-surface bg-background px-5 py-4 text-center font-jost text-xl tracking-widest text-forest-green placeholder-surface-secondary focus:border-dartmouth-green focus:outline-none disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isSubmitting || !netid.trim()}
                className="w-full rounded border-2 border-dartmouth-green bg-dartmouth-green py-4 font-jost text-xl font-semibold text-white transition-all duration-150 hover:bg-transparent hover:text-dartmouth-green disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? "Loading…" : "Sign In / Out"}
              </button>

              <WaiverLink />
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
