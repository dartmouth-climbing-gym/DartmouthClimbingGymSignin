/**
 * src/pages/SafetyPage.tsx
 * 
 * Safety & Hygiene page for the Dartmouth Climbing Gym website.
 */

import InfoPageLayout from "../components/InfoPageLayout";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border-2 border-dartmouth-green bg-surface p-6">
      <h2 className="border-b-2 border-forest-green pb-1 font-jost text-xl font-bold text-forest-green">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function SafetyPage() {
  return (
    <InfoPageLayout title="Safety & Hygiene">
      <Section title="Safety Rules">
        <ul className="ml-5 list-disc space-y-1.5 font-jost text-forest-green">
          <li>No climbing is permitted without a current monitor or submonitor on payroll present.</li>
          <li>No climbing past where the climb is indicated to finish.</li>
          <li>No topping out boulders.</li>
          <li>No climbing the loft hand railing.</li>
          <li>No climbing over people.</li>
          <li>Look through all doorways/arches before walking through them.</li>
          <li>No walking under people climbing.</li>
          <li>Stay out of all climbers&apos; landing zones.</li>
        </ul>
      </Section>

      <Section title="Hygiene Rules">
        <ul className="ml-5 list-disc space-y-1.5 font-jost text-forest-green">
          <li>No climbing shoes outside of the climbing gym or in the bathrooms.</li>
          <li>
            Climbing may only be done in climbing shoes — <strong>no street shoes</strong>.
          </li>
          <li>No barefoot climbing.</li>
          <li>No food or drink of any kind allowed on the padded carpet.</li>
          <li>Clean any and all bodily fluids from all surfaces.</li>
          <li>Wipe down gym equipment after use.</li>
        </ul>
      </Section>
    </InfoPageLayout>
  );
}
