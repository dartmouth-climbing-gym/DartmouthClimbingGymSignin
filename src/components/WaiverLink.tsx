/**
 * src/components/WaiverLink.tsx
 */

/**
 * WaiverLink component for the Dartmouth Climbing Gym website.
 *
 * @returns A React element displaying a link to the waiver form.
 */
export default function WaiverLink() {
  return (
    <a
      href="/waiver"
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded border-2 border-surface py-4 font-jost text-base font-semibold text-granite-gray transition-all duration-150 hover:border-dartmouth-green hover:text-dartmouth-green"
    >
      <svg
        className="h-4 w-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      First time? Sign the waiver
    </a>
  );
}
