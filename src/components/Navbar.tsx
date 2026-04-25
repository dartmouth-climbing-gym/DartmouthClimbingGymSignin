/**
 * src/components/Navbar.tsx
 *
 * Navbar component for the Dartmouth Climbing Gym website. This component
 * includes both a desktop and mobile navigation menu.
 */

import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/visit-us", label: "Visit Us" },
  { to: "/safety", label: "Safety" },
  { to: "/hours", label: "Hours" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const close = () => setOpen(false);

  return (
    <>
      {/* Desktop nav */}
      <nav
        className={`z-50 hidden h-nav w-full items-center justify-between px-8 sm:flex ${
          isHome ? "absolute top-0" : "sticky top-0 bg-forest-green shadow-md"
        }`}
      >
        <Link to="/" aria-label="Home">
          <img
            src="/media/climbing_gym_logo.png"
            alt="Dartmouth Climbing Gym"
            className={`h-12 ${!isHome ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <ul className="flex items-center gap-3 font-jost text-lg font-medium">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to} className="list-none">
              <NavLink
                to={to}
                className="rounded bg-spring-green px-3 py-1 text-forest-green transition-colors duration-100 hover:bg-forest-green hover:text-spring-green"
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav bar */}
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-forest-green px-5 sm:hidden">
        <Link to="/" onClick={close} aria-label="Home">
          <img
            src="/media/climbing_gym_logo.png"
            alt="Dartmouth Climbing Gym"
            className="h-10 brightness-0 invert"
          />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-0.5 w-6 bg-spring-green transition-all duration-300 origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-spring-green transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-spring-green transition-all duration-300 origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu — editorial drawer */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-forest-green sm:hidden overflow-y-auto">
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className="group border-b border-spring-green/20 px-8 py-5 transition-colors duration-150 hover:bg-dart-green/20"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="animate-slide-in" style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="block font-jost text-xs font-semibold tracking-widest text-dart-green">
                  0{i + 1}
                </span>

                <span className="block font-anton text-4xl uppercase tracking-wide text-spring-green transition-transform duration-150 group-hover:translate-x-2">
                  {label}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
