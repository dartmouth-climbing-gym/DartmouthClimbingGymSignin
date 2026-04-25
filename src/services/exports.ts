/**
 * src/services/exports.ts
 *
 * Functions for exporting data from the climbing gym's firestore database.
 * This includes functions to build a CSV of sign-in data and trigger a
 * download of the CSV file.
 */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

const USAGE_LOG_REF = "usage_log";

export async function buildSignInsCSV(): Promise<string> {
  const snap = await getDocs(query(collection(db, USAGE_LOG_REF), where("signout", "!=", 0)));
  let csv = "netid,signin,signout\n";
  snap.forEach((d) => {
    try {
      const { netid, signin, signout } = d.data() as {
        netid: string;
        signin: number;
        signout: number;
      };
      csv += `${netid},${new Date(signin).toLocaleString().replaceAll(",", "")},${new Date(signout).toLocaleString().replaceAll(",", "")}\n`;
    } catch {
      // skip malformed docs
    }
  });
  return csv;
}

export function downloadCSV(csv: string): void {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = "cdg_signins.csv";
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
