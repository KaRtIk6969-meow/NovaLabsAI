"use client";

import dynamic from "next/dynamic";

const LazyPricingSections = dynamic(
  () =>
    import("@/components/pricing/LazyPricingSections").then(
      (m) => ({ default: m.LazyPricingSections })
    ),
  { ssr: false, loading: () => null }
);

export function LazyPricingPageSections() {
  return <LazyPricingSections />;
}
