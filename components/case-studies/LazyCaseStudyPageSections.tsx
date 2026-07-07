"use client";

import dynamic from "next/dynamic";

const LazyCaseStudySections = dynamic(
  () =>
    import("@/components/case-studies/LazyCaseStudySections").then(
      (m) => ({ default: m.LazyCaseStudySections })
    ),
  { ssr: false, loading: () => null }
);

export function LazyCaseStudyPageSections() {
  return <LazyCaseStudySections />;
}
