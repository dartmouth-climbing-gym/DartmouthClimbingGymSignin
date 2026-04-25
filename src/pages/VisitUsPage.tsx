/**
 * src/pages/VisitUsPage.tsx
 * 
 * Visit Us page for the Dartmouth Climbing Gym website. 
 */

import InfoPageLayout from "../components/InfoPageLayout";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border-2 border-forest-green bg-surface p-6">
      <h2 className="border-b-2 border-forest-green pb-1 font-jost text-xl font-bold text-forest-green">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-jost font-semibold text-dartmouth-green">{children}</h3>;
}

function List({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 font-jost text-forest-green">
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function VisitUsPage() {
  return (
    <InfoPageLayout title="Visit Us — Understanding Bouldering">
      <Section title="Bouldering Basics">
        <p className="font-jost text-forest-green">
          Bouldering is a form of rock climbing on small rock formations or artificial walls like
          ours. It is inherently a dangerous sport that <strong>does NOT</strong> involve ropes or
          harnesses.
        </p>

        <List
          items={[
            "Bouldering routes are typically 15–20 feet high. Our walls average 13 feet.",
            "Crash pads are used for safety. All walls have pads installed beneath them.",
            <>
              Climbing shoes and chalk provide grip and hygiene. We use liquid chalk and chalk socks
              only — <strong>no loose or block chalk allowed</strong>.
            </>,
          ]}
        />
      </Section>

      <Section title="Bouldering Etiquette">
        <SubHeading>Safety First</SubHeading>
        <List
          items={[
            <><strong>Mind fall zones:</strong> Never walk or stand under climbers.</>,
            <><strong>Keep pads clear:</strong> No personal items or water bottles on padded areas.</>,
            <><strong>Spotting:</strong> Only spot when needed to prevent injury.</>,
          ]}
        />

        <SubHeading>Climbing in a Shared Space</SubHeading>
        <List
          items={[
            "Wait your turn if someone is climbing near your route.",
            "Give climbers space to climb and fall safely.",
            "Observe respectfully — avoid shouting beta unless asked.",
            "Limit yourself to two consecutive attempts per climb.",
          ]}
        />

        <SubHeading>Being Considerate</SubHeading>
        <List
          items={[
            "Ask politely for advice or offer help only when requested.",
            "Respect climbers at all levels. Avoid showing off or boasting.",
            "Clean up after yourself — chalk, trash, gear, etc.",
          ]}
        />
      </Section>

      <Section title="Equipment and Gear">
        <SubHeading>What to Bring</SubHeading>
        <List items={["Athletic clothing (shorts, t-shirt, jacket in winter)", "Water bottle"]} />

        <SubHeading>Climbing Shoes</SubHeading>
        <List
          items={[
            "Free rentals available — sizes 35 to 51, including half sizes",
            "Disinfected after every use",
            "Personal climbing shoes encouraged for better performance and hygiene",
          ]}
        />

        <SubHeading>Chalk</SubHeading>
        <List
          items={[
            "Free liquid chalk and chalk balls provided",
            <><strong>No loose or block chalk allowed</strong></>,
          ]}
        />

        <SubHeading>Brushes</SubHeading>
        <List items={["Handheld and stick brushes provided to clean holds"]} />
      </Section>

      <Section title="What the Gym Offers">
        <List
          items={[
            "Crash pads under all walls",
            "Liquid Chalk",
            "Chalk Bags",
            "Climbing Shoes",
            "Brushes (handheld + stick)",
            "Water dispenser",
            "Exercise equipment: dumbbells, gymnastic rings, pull-up bars, bench, bands, fingerboards, etc.",
          ]}
        />
      </Section>
    </InfoPageLayout>
  );
}
