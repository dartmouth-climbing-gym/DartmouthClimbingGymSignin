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
        className={`z-50 hidden h-nav w-full items-center justify-between px-10 sm:flex ${
          isHome ? "absolute top-0" : "sticky top-0 bg-forest-green border-b border-white/10"
        }`}
      >
        {/* Logo */}
        <Link to="/" aria-label="Home">
          <img
            src="/media/climbing_gym_logo.png"
            alt="Dartmouth Climbing Gym"
            className="h-10 brightness-0 invert opacity-90 transition-opacity hover:opacity-100"
          />
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `group relative font-jost text-sm font-semibold uppercase tracking-widest transition-colors duration-150 ${
                    isActive ? "text-spring-green" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-spring-green transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sign Waiver CTA */}
        <a
          href="/waiver"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-spring-green px-5 py-2 font-jost text-sm font-semibold text-spring-green transition-all duration-150 hover:bg-spring-green hover:text-forest-green"
        >
          Sign Waiver
        </a>
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

      {/* ── Mobile full-screen drawer ── */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-forest-green sm:hidden">
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className="group border-b border-spring-green/20 px-8 py-5 transition-colors duration-150 hover:bg-dartmouth-green/20"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="animate-slide-in" style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="block font-jost text-xs font-semibold tracking-widest text-dartmouth-green">
                  0{i + 1}
                </span>

                <span className="block font-anton text-4xl uppercase tracking-wide text-spring-green transition-transform duration-150 group-hover:translate-x-2">
                  {label}
                </span>
              </div>
            </NavLink>
          ))}

          {/* Waiver link in mobile drawer */}
          <a
            href="/waiver"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mx-8 mt-6 self-start rounded border-2 border-spring-green px-6 py-3 font-jost text-base font-semibold text-spring-green transition-all duration-150 hover:bg-spring-green hover:text-forest-green"
          >
            Sign Waiver →
          </a>
        </div>
      )}
    </>
  );
}
