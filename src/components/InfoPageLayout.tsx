/**
 * src/components/InfoPageLayout.tsx
 *
 * A simple layout component for informational pages on the Dartmouth Climbing
 * Gym website. This component provides a consistent structure and styling for
 * pages that display static content, such as the "Visit Us" or "Safety" pages.
 */

import type { ReactNode } from "react";

interface InfoPageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function InfoPageLayout({ title, children }: InfoPageLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-4 py-8">
      <h1 className="font-anton text-4xl uppercase tracking-wide text-forest-green">{title}</h1>
      {children}
    </main>
  );
}
