"use client";

import dynamic from "next/dynamic";

const TrustedCompanies = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.TrustedCompanies })),
  { ssr: false, loading: () => null }
);

const Features = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.Features })),
  { ssr: false, loading: () => null }
);

const Metrics = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.Metrics })),
  { ssr: false, loading: () => null }
);

const AISolutions = dynamic(
  () => import("@/components/sections").then((m) => ({ default: m.AISolutions })),
  { ssr: false, loading: () => null }
);

export function LazySections() {
  return (
    <>
      <TrustedCompanies />
      <Features />
      <Metrics />
      <AISolutions />
    </>
  );
}
