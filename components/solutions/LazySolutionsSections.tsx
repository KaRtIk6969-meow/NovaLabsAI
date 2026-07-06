"use client";

import dynamic from "next/dynamic";

const SolutionsCategories = dynamic(
  () => import("@/components/solutions/SolutionsCategories").then((m) => ({ default: m.SolutionsCategories })),
  { ssr: false, loading: () => null }
);

const InteractiveShowcase = dynamic(
  () => import("@/components/solutions/InteractiveShowcase").then((m) => ({ default: m.InteractiveShowcase })),
  { ssr: false, loading: () => null }
);

const IndustriesBySolution = dynamic(
  () => import("@/components/solutions/IndustriesBySolution").then((m) => ({ default: m.IndustriesBySolution })),
  { ssr: false, loading: () => null }
);

const Benefits = dynamic(
  () => import("@/components/solutions/Benefits").then((m) => ({ default: m.Benefits })),
  { ssr: false, loading: () => null }
);

const Architecture = dynamic(
  () => import("@/components/solutions/Architecture").then((m) => ({ default: m.Architecture })),
  { ssr: false, loading: () => null }
);

const CTASolutions = dynamic(
  () => import("@/components/solutions/CTASolutions").then((m) => ({ default: m.CTASolutions })),
  { ssr: false, loading: () => null }
);

export function LazySolutionsSections() {
  return (
    <>
      <SolutionsCategories />
      <InteractiveShowcase />
      <IndustriesBySolution />
      <Benefits />
      <Architecture />
      <CTASolutions />
    </>
  );
}
