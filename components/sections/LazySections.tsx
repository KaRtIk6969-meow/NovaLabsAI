"use client";

import dynamic from "next/dynamic";

const TrustedCompanies = dynamic(
  () => import("@/components/sections/TrustedCompanies").then((m) => ({ default: m.TrustedCompanies })),
  { ssr: false, loading: () => null }
);

const Features = dynamic(
  () => import("@/components/sections/Features").then((m) => ({ default: m.Features })),
  { ssr: false, loading: () => null }
);

const Metrics = dynamic(
  () => import("@/components/sections/Metrics").then((m) => ({ default: m.Metrics })),
  { ssr: false, loading: () => null }
);

const AISolutions = dynamic(
  () => import("@/components/sections/AISolutions").then((m) => ({ default: m.AISolutions })),
  { ssr: false, loading: () => null }
);

const HowItWorks = dynamic(
  () => import("@/components/sections/HowItWorks").then((m) => ({ default: m.HowItWorks })),
  { ssr: false, loading: () => null }
);

const EnterpriseFeatures = dynamic(
  () => import("@/components/sections/EnterpriseFeatures").then((m) => ({ default: m.EnterpriseFeatures })),
  { ssr: false, loading: () => null }
);

const CaseStudies = dynamic(
  () => import("@/components/sections/CaseStudies").then((m) => ({ default: m.CaseStudies })),
  { ssr: false, loading: () => null }
);

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: false, loading: () => null }
);

const Pricing = dynamic(
  () => import("@/components/sections/Pricing").then((m) => ({ default: m.Pricing })),
  { ssr: false, loading: () => null }
);

export function LazySections() {
  return (
    <>
      <TrustedCompanies />
      <Features />
      <Metrics />
      <AISolutions />
      <HowItWorks />
      <EnterpriseFeatures />
      <CaseStudies />
      <Testimonials />
      <Pricing />
    </>
  );
}
