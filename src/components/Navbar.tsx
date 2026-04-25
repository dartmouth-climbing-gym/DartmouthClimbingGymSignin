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
        className={`
          z-50 hidden h-nav w-full items-center justify-between px-8 sm:flex
          ${isHome ? "absolute top-0" : "sticky top-0 bg-forest-green shadow-md"}
        `}
      >
        <Link to="/" aria-label="Home">
          <img
            src="/media/climbing_gym_logo.png"
            alt="Dartmouth Climbing Gym"
            className={`h-12 ${!isHome ? "invert" : ""}`}
          />
        </Link>

        <ul className="flex items-center gap-3 font-jost text-lg font-medium">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to} className="list-none">
              <NavLink
                to={to}
                className="rounded px-3 py-1 bg-spring-green text-forest-green transition-colors duration-100 hover:bg-forest-green hover:text-spring-green"
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav bar */}
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-spring-green px-5 sm:hidden">
        <Link to="/" onClick={close} aria-label="Home">
          <img src="/media/climbing_gym_logo.png" alt="Dartmouth Climbing Gym" className="h-10" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col justify-center gap-1.5 p-1"
        >
          <span
            className={`block h-0.5 w-7 bg-forest-green transition-transform duration-300 origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-7 bg-forest-green transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-7 bg-forest-green transition-transform duration-300 origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col items-center gap-8 bg-spring-green pt-12 sm:hidden">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className="font-jost text-2xl font-medium text-forest-green"
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
