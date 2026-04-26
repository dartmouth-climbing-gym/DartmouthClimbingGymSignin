/**
 * src/components/Section.tsx
 */

/**
 * Section component for organizing content in the Dartmouth Climbing Gym admin
 * dashboard.
 *
 * @param param0 - Object with `title` and `children` properties.
 * @returns A React element displaying the section.
 */
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

Section.defaultProps = { title: undefined };

export default Section;
