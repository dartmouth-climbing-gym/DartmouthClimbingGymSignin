/**
 * src/components/SubHeading.tsx
 */

/**
 * SubHeading component for section subheadings in the Dartmouth Climbing Gym
 *
 * @param param0 - Object with a `children` property containing the subheading
 * text or elements.
 * @returns A React element displaying the subheading with consistent styling.
 */
export default function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-jost font-semibold text-dartmouth-green">{children}</h3>;
}
