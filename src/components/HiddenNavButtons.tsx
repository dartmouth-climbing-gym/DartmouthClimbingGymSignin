/**
 * src/components/HiddenNavButtons.tsx
 *
 * This component renders two invisible buttons in the top-right corner of the
 * screen. When hovered, they become partially visible, allowing access to the
 * admin and sign-in pages. This is a simple way to hide these routes from
 * casual users while still making them accessible.
 */

import { Link } from "react-router-dom";

export default function HiddenNavButtons() {
  return (
    <>
      <Link
        to="/admin"
        aria-label="Admin"
        className="fixed right-2 top-2 z-50 h-4 w-4 rounded-full bg-dartmouth-green opacity-0 transition-opacity duration-300 hover:opacity-30"
      />

      <Link
        to="/signin"
        aria-label="Sign In"
        className="fixed right-2 top-8 z-50 h-4 w-4 rounded-full bg-dartmouth-green opacity-0 transition-opacity duration-300 hover:opacity-30"
      />
    </>
  );
}
