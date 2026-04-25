/**
 * src/pages/ContactUsPage.tsx
 * 
 * Contact Us page for the Dartmouth Climbing Gym website. 
 */

import InfoPageLayout from "../components/InfoPageLayout";

const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSexL18glGB2nSISirun4TFyT4f1x7_uDPn58UBJumGe6ak7jQ/viewform?embedded=true";

export default function ContactUsPage() {
  return (
    <InfoPageLayout title="Contact Us">
      <section className="flex flex-col gap-4 rounded-2xl border-2 border-dartmouth-green bg-surface p-6">
        <h2 className="border-b-2 border-forest-green pb-1 font-jost text-xl font-bold text-forest-green">
          Contacting the Dartmouth Climbing Gym
        </h2>

        <p className="font-jost text-forest-green">
          Let us know of any questions and/or feedback about any upcoming or previous visits.
          We&apos;d love to hear from you!
        </p>

        <p className="font-jost text-forest-green">
          Below you&apos;ll find ways to contact management, as well as a feedback form so we can
          better understand how people are enjoying the gym.
        </p>

        <p className="rounded-xl bg-spring-green px-4 py-3 font-jost text-sm text-dartmouth-green">
          <strong>*</strong> If you are inquiring about the <strong>CLIMBING TEAM</strong>, please
          note that the Dartmouth Climbing <u>Gym</u> and Dartmouth Climbing <u>Team</u> are two
          separate entities. Management does not directly oversee the Climbing Team. To contact
          them, email{" "}
          <a
            href="mailto:Dartmouth.Climbing.Team@dartmouth.edu"
            className="font-medium underline hover:text-dartmouth-green"
          >
            Dartmouth.Climbing.Team@dartmouth.edu
          </a>
          . <strong>*</strong>
        </p>

        <h2 className="border-b-2 border-forest-green pb-1 font-jost text-xl font-bold text-forest-green">
          Ways to Contact Us
        </h2>
        <ul className="ml-5 list-disc space-y-2 font-jost text-forest-green">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:climbing.gym@dartmouth.edu"
              className="underline hover:text-dartmouth-green"
            >
              climbing.gym@dartmouth.edu
            </a>
          </li>

          <li>
            <strong>GroupMe:</strong>{" "}
            <a
              href="https://groupme.com/join_group/85347987/5H4gayRj"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-dartmouth-green"
            >
              Click here to join!
            </a>
          </li>

          <li>
            <strong>Feedback Form:</strong>{" "}
            <a href="#feedback-form" className="underline hover:text-dartmouth-green">
              See below
            </a>
          </li>

          <li>
            <strong>OPO Supervisor:</strong>{" "}
            <a
              href="mailto:Zachary.N.Conrad@dartmouth.edu"
              className="underline hover:text-dartmouth-green"
            >
              Zachary.N.Conrad@dartmouth.edu
            </a>
          </li>
        </ul>

        <h2
          id="feedback-form"
          className="border-b-2 border-forest-green pb-1 font-jost text-xl font-bold text-forest-green"
        >
          Feedback Form
        </h2>
        
        <iframe
          src={FEEDBACK_FORM_URL}
          title="Dartmouth Climbing Gym Feedback Form"
          className="h-screen w-full rounded-xl border-2 border-dartmouth-green"
        >
          Loading…
        </iframe>
      </section>
    </InfoPageLayout>
  );
}
