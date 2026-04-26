/**
 * src/pages/AdminPage.tsx
 * 
 * Admin page for the Dartmouth Climbing Gym website.
 */

import { useEffect, useRef, useState } from "react";
import { buildSignInsCSV, downloadCSV } from "../services/exports";
import { signOutAll } from "../services/sessions";
import { getName } from "../services/waivers";
import useActiveClimbers from "../hooks/useActiveClimbers";
import LoginGate from "../components/LoginGate";
import ClimberRow from "../components/ClimberRow";

function Dashboard() {
  const climbers = useActiveClimbers();
  const [names, setNames] = useState<Record<string, string>>({});
  const [tick, setTick] = useState(Date.now());
  const [csvLoading, setCsvLoading] = useState(false);
  const [signOutAllLoading, setSignOutAllLoading] = useState(false);
  const [confirmSignOutAll, setConfirmSignOutAll] = useState(false);
  const confirmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchedNetids = useRef(new Set<string>());

  // Tick every 30s to refresh elapsed times
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // Fetch names for any climbers we don't have yet
  useEffect(() => {
    climbers.forEach((c) => {
      if (!fetchedNetids.current.has(c.netid)) {
        fetchedNetids.current.add(c.netid);

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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  return authed ? <Dashboard /> : <LoginGate onAuth={() => setAuthed(true)} />;
}
