"use client";

import dynamic from "next/dynamic";

const ContactOptions = dynamic(
  () => import("@/components/contact/ContactOptions").then((m) => ({ default: m.ContactOptions })),
  { ssr: false, loading: () => null }
);

const ContactForm = dynamic(
  () => import("@/components/contact/ContactForm").then((m) => ({ default: m.ContactForm })),
  { ssr: false, loading: () => null }
);

const StrategyCall = dynamic(
  () => import("@/components/contact/StrategyCall").then((m) => ({ default: m.StrategyCall })),
  { ssr: false, loading: () => null }
);

const GlobalPresence = dynamic(
  () => import("@/components/contact/GlobalPresence").then((m) => ({ default: m.GlobalPresence })),
  { ssr: false, loading: () => null }
);

const FAQContact = dynamic(
  () => import("@/components/contact/FAQContact").then((m) => ({ default: m.FAQContact })),
  { ssr: false, loading: () => null }
);

const CTAContact = dynamic(
  () => import("@/components/contact/CTAContact").then((m) => ({ default: m.CTAContact })),
  { ssr: false, loading: () => null }
);

const FloatingAssistant = dynamic(
  () => import("@/components/contact/FloatingAssistant").then((m) => ({ default: m.FloatingAssistant })),
  { ssr: false, loading: () => null }
);

export function LazyContactSections() {
  return (
    <>
      <ContactOptions />
      <ContactForm />
      <StrategyCall />
      <GlobalPresence />
      <FAQContact />
      <CTAContact />
      <FloatingAssistant />
    </>
  );
}
