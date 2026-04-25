/**
 * src/components/Footer.tsx
 *
 * A simple footer component for the Dartmouth Climbing Gym website. This
 * component displays the gym's logo and a list of navigation links at the
 * bottom of the page.
 */

import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { to: "/visit-us", label: "Visit Us" },
  { to: "/safety", label: "Safety" },
  { to: "/hours", label: "Hours" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 bg-forest-green py-5">
      <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <Link to="/" aria-label="Home">
          <img
            src="/media/climbing_gym_logo.png"
            alt="Dartmouth Climbing Gym"
            className="h-10 invert"
          />
        </Link>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-jost">
          {FOOTER_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="text-white transition-all duration-100 hover:scale-110 hover:font-medium inline-block"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="font-jost text-xs font-medium text-spring-green">
        © {new Date().getFullYear()} Dartmouth Climbing Gym
      </p>
    </footer>
  );
}
