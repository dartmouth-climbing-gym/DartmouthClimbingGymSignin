/**
 * src/pages/HoursPage.tsx
 * 
 * This page displays the hours of operation for the Dartmouth Climbing Gym. It 
 * embeds a calendar from Outlook that shows the gym's schedule, including any 
 * special hours or closures. If the user's browser does not support iframes, 
 * it provides a link to view the calendar directly.
 */

const CALENDAR_URL =
  "https://outlook.office365.com/owa/calendar/e6f8bd1d0b2349cc8ab1862f71b238ef@dartmouth.edu/0758097999e94d8f852afbf7e000ace04085812006751256335/calendar.html";

export default function HoursPage() {
  return (
    <main className="flex flex-1 flex-col min-h-screen">
      <iframe
        src={CALENDAR_URL}
        title="Dartmouth Climbing Gym Hours Calendar"
        className="flex-1 w-full border-none"
      >
        <p className="font-jost text-forest-green p-4">
          Your browser does not support iframes.{" "}
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-dart-green"
          >
            View the calendar directly.
          </a>
        </p>
      </iframe>
    </main>
  );
}
