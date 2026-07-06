"use client";

import dynamic from "next/dynamic";

const CompanyStory = dynamic(
  () => import("@/components/about/CompanyStory").then((m) => ({ default: m.CompanyStory })),
  { ssr: false, loading: () => null }
);

const CoreValues = dynamic(
  () => import("@/components/about/CoreValues").then((m) => ({ default: m.CoreValues })),
  { ssr: false, loading: () => null }
);

const Leadership = dynamic(
  () => import("@/components/about/Leadership").then((m) => ({ default: m.Leadership })),
  { ssr: false, loading: () => null }
);

const WhyNovaLabs = dynamic(
  () => import("@/components/about/WhyNovaLabs").then((m) => ({ default: m.WhyNovaLabs })),
  { ssr: false, loading: () => null }
);

const MetricsAbout = dynamic(
  () => import("@/components/about/MetricsAbout").then((m) => ({ default: m.MetricsAbout })),
  { ssr: false, loading: () => null }
);

const CTAAbout = dynamic(
  () => import("@/components/about/CTAAbout").then((m) => ({ default: m.CTAAbout })),
  { ssr: false, loading: () => null }
);

export function LazyAboutSections() {
  return (
    <>
      <CompanyStory />
      <CoreValues />
      <Leadership />
      <WhyNovaLabs />
      <MetricsAbout />
      <CTAAbout />
    </>
  );
}
