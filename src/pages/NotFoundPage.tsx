/**
 * src/pages/NotFoundPage.tsx
 * 
 * 404 Not Found page for the Dartmouth Climbing Gym website. 
 */

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="font-anton text-8xl uppercase tracking-wide text-dartmouth-green">404</h1>
      <p className="font-jost text-2xl font-medium text-forest-green">Page not found.</p>
      
      <Link
        to="/"
        className="rounded bg-dartmouth-green px-6 py-2 font-jost text-lg font-medium text-white transition-colors duration-100 hover:bg-forest-green"
      >
        Back to Home
      </Link>
    </main>
  );
}
