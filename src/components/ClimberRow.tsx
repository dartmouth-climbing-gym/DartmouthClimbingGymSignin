/**
 * src/components/ClimberRow.tsx
 *
 * Row component for displaying an active climber in the AdminPage dashboard.
 */

import { useState } from "react";
import { signOutIndividual } from "../services/sessions";
import type { ClimberSession } from "../types";

function elapsed(signinMs: number): string {
  const mins = Math.floor((Date.now() - signinMs) / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ClimberRow({
  climber,
  name,
  tick,
}: {
  climber: ClimberSession;
  name: string;
  tick: number;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOutIndividual(climber.netid, climber.signin);
    } finally {
      setLoading(false);
    }
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
