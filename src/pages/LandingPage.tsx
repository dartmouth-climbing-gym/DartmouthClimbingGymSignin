/**
 * src/pages/LandingPage.tsx
 * 
 * Landing page for the Dartmouth Climbing Gym website.
 */

import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import useCapacity from "../hooks/useCapacity";

const QUICK_LINKS = [
  { to: "/visit-us", label: "Visit Us", desc: "Bouldering basics and etiquette" },
  { to: "/safety", label: "Safety", desc: "Rules and hygiene guidelines" },
  { to: "/hours", label: "Hours", desc: "Current gym schedule" },
  { to: "/services", label: "Services", desc: "Walls, boards, and equipment" },
  { to: "/contact", label: "Contact Us", desc: "Get in touch with management" },
];

function CapacityBadge({ count }: { count: number | null }) {
  const isLoading = count === null;

  return (
    <div className="absolute right-6 top-24 flex flex-col items-center gap-1.5 rounded-2xl bg-forest-green/80 px-5 py-4 text-center backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${isLoading ? "animate-pulse bg-spring-green/50" : "bg-spring-green"}`}
        />

        <span className="font-jost text-xs font-semibold uppercase tracking-widest text-spring-green">
          Live
        </span>
      </div>

      <span className="font-anton text-4xl leading-none text-white">
        {isLoading ? "—" : count}
      </span>

      <span className="font-jost text-xs uppercase tracking-widest text-white/60">
        {count === 1 ? "climber" : "climbers"}
      </span>
    </div>
  );
}

// Portalled to document.body so no stacking context can intercept clicks
function KioskButtons() {
  return createPortal(
    <>
      <Link
        to="/admin"
        aria-label="Admin"
        className="fixed right-2 top-2 z-top h-5 w-5 cursor-pointer rounded-full bg-dartmouth-green opacity-0 transition-opacity duration-300 hover:opacity-40"
      />

      <Link
        to="/signin"
        aria-label="Sign In"
        className="fixed right-2 top-9 z-top h-5 w-5 cursor-pointer rounded-full bg-dartmouth-green opacity-0 transition-opacity duration-300 hover:opacity-40"
      />
    </>,
    document.body,
  );
}

export default function LandingPage() {
  const capacity = useCapacity();

  return (
    <>
      <KioskButtons />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col justify-end pb-20 pl-10 sm:pl-28">
        <img
          src="/media/hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="hero-gradient absolute inset-0 opacity-80" />

        <CapacityBadge count={capacity} />

        <div className="animate-fade-up flex max-w-2xl flex-col gap-6">
          <div className="leading-none">
            <h1 className="font-anton text-7xl uppercase text-white sm:text-9xl">Dartmouth</h1>

            <h2 className="font-anton text-4xl uppercase text-spring-green sm:text-6xl">
              Climbing Gym
            </h2>
          </div>

          <div className="h-0.5 w-16 bg-spring-green" />

          <p className="font-jost text-lg font-light text-white/70 sm:text-xl">
            Bouldering for everyone at Dartmouth. Open to the entire community.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/waiver"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border-2 border-spring-green bg-spring-green px-8 py-3 font-jost text-lg font-semibold text-forest-green transition-all duration-150 hover:bg-transparent hover:text-spring-green"
            >
              Sign Waiver
            </a>

            <Link
              to="/visit-us"
              className="rounded border-2 border-white/30 px-8 py-3 font-jost text-lg font-semibold text-white transition-all duration-150 hover:border-spring-green hover:text-spring-green"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── GroupMe ── */}
      <section className="flex bg-forest-green px-6 py-16 sm:px-16 items-center">
        <div className="mx-auto flex items-center max-w-4xl flex-col gap-10 sm:flex-row sm:gap-16">
          <div className="flex flex-col gap-5 items-center sm:items-start">
            <p className="font-jost text-xs font-semibold uppercase tracking-widest text-spring-green">
              Stay Connected
            </p>

            <h2 className="font-anton text-4xl uppercase text-white sm:text-5xl">
              Join our GroupMe
            </h2>

            <div className="h-0.5 w-12 bg-spring-green" />

            <p className="font-jost text-base font-light text-white/60 sm:text-lg">
              For the latest news, updates, hours, and events for the term.
            </p>

            <a
              href="https://groupme.com/join_group/85347987/3mfDyZUt"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:self-start rounded border-2 border-spring-green bg-spring-green px-8 py-3 font-jost text-lg font-semibold text-forest-green transition-all duration-150 hover:bg-transparent hover:text-spring-green"
            >
              Join the GroupMe
            </a>
          </div>

          <img
            src="/media/groupme_qr.png"
            alt="GroupMe QR Code"
            className="w-40 shrink-0 rounded-xl sm:w-48"
          />
        </div>
      </section>

      {/* ── Quick links ── */}
      <section className="bg-background px-6 py-16 sm:px-16">
        <h2 className="mb-8 font-anton text-3xl uppercase tracking-wide text-forest-green">
          Explore
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center justify-between rounded-2xl border-2 border-dartmouth-green bg-white p-5 transition-all duration-150 hover:bg-dartmouth-green"
            >
              <div>
                <p className="font-jost font-semibold text-forest-green transition-colors group-hover:text-white">
                  {label}
                </p>

                <p className="font-jost text-sm text-forest-green/60 transition-colors group-hover:text-white/70">
                  {desc}
                </p>
              </div>

              <span className="font-jost text-xl text-dartmouth-green transition-colors group-hover:text-spring-green">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
