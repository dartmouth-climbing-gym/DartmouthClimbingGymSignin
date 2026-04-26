/**
 * Simple List component to render a list of items with consistent styling.
 *
 * @param param0 - Object with an `items` property, which is an array of React
 * nodes to be rendered as list items.
 * @returns A React element displaying the list.
 */
export default function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 font-jost text-forest-green">
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
