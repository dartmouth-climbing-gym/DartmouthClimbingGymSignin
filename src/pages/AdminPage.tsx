/**
 * src/pages/AdminPage.tsx
 * 
 * Admin page for the Dartmouth Climbing Gym website.
 */

import { useEffect, useRef, useState } from "react";
import { adminLogin } from "../services/auth";
import { buildSignInsCSV, downloadCSV } from "../services/exports";
import { signOutAll, signOutIndividual } from "../services/sessions";
import { getName } from "../services/waivers";
import useActiveClimbers from "../hooks/useActiveClimbers";
import type { ClimberSession } from "../types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function elapsed(signinMs: number): string {
  const mins = Math.floor((Date.now() - signinMs) / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LoginGate({ onAuth }: { onAuth: () => void }) {
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
          <img
            src="/media/climbing-gym-logo.png"
            alt="Dartmouth Climbing Gym"
            className="w-20"
          />

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

function ClimberRow({
  climber,
  name,
  tick,
  onSignOut,
}: {
  climber: ClimberSession;
  name: string;
  tick: number;
  onSignOut: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOutIndividual(climber.netid, climber.signin);
    } finally {
      setLoading(false);
    }
    onSignOut();
  }

  return (
    <tr className="border-b border-surface transition-colors last:border-0 hover:bg-background">
      <td className="px-4 py-3 font-jost text-sm font-semibold text-forest-green">
        {climber.netid}
      </td>

      <td className="px-4 py-3 font-jost text-sm text-granite-gray">{name || "—"}</td>

      <td className="px-4 py-3 font-jost text-sm tabular-nums text-granite-gray">
        {formatTime(climber.signin)}
      </td>

      <td className="px-4 py-3 font-jost text-sm tabular-nums text-dartmouth-green">
        {/* tick used as a dependency to re-render elapsed time */}
        {tick > 0 && elapsed(climber.signin)}
      </td>

      <td className="px-4 py-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className="rounded border border-surface px-3 py-1 font-jost text-xs font-semibold text-granite-gray transition-colors hover:border-red-300 hover:text-red-500 disabled:opacity-40"
        >
          {loading ? "…" : "Sign Out"}
        </button>
      </td>
    </tr>
  );
}

function Dashboard() {
  const climbers = useActiveClimbers();
  const [names, setNames] = useState<Record<string, string>>({});
  const [tick, setTick] = useState(Date.now());
  const [csvLoading, setCsvLoading] = useState(false);
  const [signOutAllLoading, setSignOutAllLoading] = useState(false);
  const [confirmSignOutAll, setConfirmSignOutAll] = useState(false);
  const confirmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tick every 30s to refresh elapsed times
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // Fetch names for any climbers we don't have yet
  useEffect(() => {
    climbers.forEach((c) => {
      if (!names[c.netid]) {
        getName(c.netid).then((n) => {
          if (n) setNames((prev) => ({ ...prev, [c.netid]: n }));
        });
      }
    });
  }, [climbers]);

  async function handleSignOutAll() {
    if (!confirmSignOutAll) {
      setConfirmSignOutAll(true);
      confirmTimer.current = setTimeout(() => setConfirmSignOutAll(false), 4000);
      return;
    }
    if (confirmTimer.current) clearTimeout(confirmTimer.current);
    setSignOutAllLoading(true);
    await signOutAll();
    setSignOutAllLoading(false);
    setConfirmSignOutAll(false);
  }

  async function handleDownloadCSV() {
    setCsvLoading(true);
    const csv = await buildSignInsCSV();
    downloadCSV(csv);
    setCsvLoading(false);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-forest-green px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/media/climbing-gym-logo.png"
              alt="Dartmouth Climbing Gym"
              className="w-10 brightness-0 invert"
            />

            <div>
              <p className="font-jost text-xs font-semibold uppercase tracking-widest text-spring-green">
                Staff Dashboard
              </p>
              <h1 className="font-anton text-2xl uppercase text-white">Admin</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-spring-green" />
              <span className="font-jost text-sm font-semibold text-white">
                {climbers.length} active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">
        {/* Actions row */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSignOutAll}
            disabled={signOutAllLoading || climbers.length === 0}
            className={`rounded border-2 px-5 py-2.5 font-jost text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
              confirmSignOutAll
                ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
                : "border-surface bg-white text-granite-gray hover:border-red-300 hover:text-red-500"
            }`}
          >
            {signOutAllLoading ? "Signing out…" : confirmSignOutAll ? "Confirm Sign Out All" : "Sign Out All"}
          </button>

          <button
            type="button"
            onClick={handleDownloadCSV}
            disabled={csvLoading}
            className="flex items-center gap-2 rounded border-2 border-surface bg-white px-5 py-2.5 font-jost text-sm font-semibold text-granite-gray transition-colors hover:border-dartmouth-green hover:text-dartmouth-green disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {csvLoading ? "Building…" : "Download CSV"}
          </button>
        </div>

        {/* Climber table */}
        <div className="overflow-hidden rounded-2xl border-2 border-surface bg-white">
          {climbers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <p className="font-anton text-2xl uppercase text-forest-green/30">No Active Climbers</p>
              <p className="font-jost text-sm text-surface-secondary">The gym is empty right now</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-surface bg-background">
                  <th className="px-4 py-3 text-left font-jost text-xs font-semibold uppercase tracking-widest text-surface-secondary">
                    Net ID
                  </th>
                  <th className="px-4 py-3 text-left font-jost text-xs font-semibold uppercase tracking-widest text-surface-secondary">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-jost text-xs font-semibold uppercase tracking-widest text-surface-secondary">
                    Sign In
                  </th>
                  <th className="px-4 py-3 text-left font-jost text-xs font-semibold uppercase tracking-widest text-surface-secondary">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left font-jost text-xs font-semibold uppercase tracking-widest text-surface-secondary">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {climbers.map((c) => (
                  <ClimberRow
                    key={c.id}
                    climber={c}
                    name={names[c.netid] ?? ""}
                    tick={tick}
                    onSignOut={() => {}}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  return authed ? <Dashboard /> : <LoginGate onAuth={() => setAuthed(true)} />;
}
