/**
 * src/pages/ServicesPage.tsx
 * 
 * Services & Equipment page for the Dartmouth Climbing Gym website. 
 */

import InfoPageLayout from "../components/InfoPageLayout";

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border-2 border-dartmouth-green bg-surface p-6">
      {title && (
        <h2 className="border-b-2 border-forest-green pb-1 font-jost text-xl font-bold text-forest-green">
          {title}
        </h2>
      )}
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

export default function ServicesPage() {
  return (
    <InfoPageLayout title="Services & Equipment">
      <Section>
        <p className="font-jost font-semibold text-forest-green">We offer:</p>

        <List
          items={[
            <><strong>100+ bouldering problems</strong> across all skill levels</>,
            <><strong>Weekly route setting</strong> to keep challenges fresh and engaging</>,
            <><strong>10+ walls</strong> with angles ranging from slab to steep overhang</>,
            <><strong>3 spray walls</strong> at different angles for creative and endurance climbing</>,
            <><strong>Varied route-setting styles</strong> reflecting competition, flowy, powerful, and technical climbing</>,
          ]}
        />
      </Section>

      <Section title="Facilities Available Downstairs">
        <p className="font-jost text-forest-green">
          Located at the bottom of the stairwell and in the training room, we offer a wide range of
          training equipment to support your climbing fitness.
        </p>

        <SubHeading>Exercise Equipment</SubHeading>
        <List
          items={[
            "Free weights",
            "Dumbbells",
            "Kettlebells",
            "Non-standardized weight plates",
            "Pull-up bar",
            "Bench",
          ]}
        />

        <SubHeading>Fingerboards & Hangboards</SubHeading>
        <List
          items={[
            "Fingerboards",
            "Beastmaker 2000",
            "Lattice 20mm rung",
            "Beastmaker micros (10mm, 8mm, 6mm)",
            "Moon Fingerboard",
            "Rock Prodigy Training Center",
          ]}
        />

        <SubHeading>Board Training</SubHeading>
        <List items={["Campus board", "Moon Board 2016"]} />
      </Section>

      <Section title="Liquid Chalk Dispensers">
        <p className="font-jost text-forest-green">
          Three liquid chalk dispensers are freely available downstairs:
        </p>

        <List
          items={[
            "Immediately to the right of the doorway entering the wave room from the bottom of the main stairwell.",
            "In the training room, to the left of the doorway before entering the 20-degree room.",
            "At the entrance to the doorway leading to the back stairwell.",
          ]}
        />
      </Section>
    </InfoPageLayout>
  );
}
