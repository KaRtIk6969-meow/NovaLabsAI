"use client";

import dynamic from "next/dynamic";

const ServicesGrid = dynamic(
  () => import("@/components/services/ServicesGrid").then((m) => ({ default: m.ServicesGrid })),
  { ssr: false, loading: () => null }
);

const DetailedServices = dynamic(
  () => import("@/components/services/DetailedServices").then((m) => ({ default: m.DetailedServices })),
  { ssr: false, loading: () => null }
);

const DeliveryProcess = dynamic(
  () => import("@/components/services/DeliveryProcess").then((m) => ({ default: m.DeliveryProcess })),
  { ssr: false, loading: () => null }
);

const IndustriesServed = dynamic(
  () => import("@/components/services/IndustriesServed").then((m) => ({ default: m.IndustriesServed })),
  { ssr: false, loading: () => null }
);

const ServicesFAQ = dynamic(
  () => import("@/components/services/ServicesFAQ").then((m) => ({ default: m.FAQ })),
  { ssr: false, loading: () => null }
);

const CTAServices = dynamic(
  () => import("@/components/services/CTAServices").then((m) => ({ default: m.CTAServices })),
  { ssr: false, loading: () => null }
);

export function LazyServicesSections() {
  return (
    <>
      <ServicesGrid />
      <DetailedServices />
      <DeliveryProcess />
      <IndustriesServed />
      <ServicesFAQ />
      <CTAServices />
    </>
  );
}
