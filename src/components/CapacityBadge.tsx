/**
 * src/components/CapacityBadge.tsx
 */

/**
 * Small badge component to display the current number of climbers in the gym.
 *
 * @param param0 - Object with a `count` property representing the current
 * number of climbers, or null if loading.
 * @returns A React element displaying the capacity badge.
 */
export default function CapacityBadge({ count }: { count: number | null }) {
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

      <span className="font-anton text-4xl leading-none text-white">{isLoading ? "—" : count}</span>

      <span className="font-jost text-xs uppercase tracking-widest text-white/60">
        {count === 1 ? "climber" : "climbers"}
      </span>
    </div>
  );
}
