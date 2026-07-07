import type { Metadata } from "next";
import { HeroContact } from "@/components/contact/HeroContact";
import { LazyContactSections } from "@/components/contact/LazyContactSections";
import { WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

const CONTACT_FAQ_ITEMS = [
  {
    question: "How quickly can we get started with an AI project?",
    answer: "Most projects begin within 1-2 weeks of initial consultation. Our Discovery phase typically takes 2 weeks, after which we provide a detailed roadmap, timeline, and cost estimate. For urgent needs, we can fast-track to a pilot in as little as 5 business days.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We work across financial services, healthcare, e-commerce, logistics, manufacturing, and SaaS. Our AI infrastructure is industry-agnostic, but we have deep domain expertise in regulated industries where compliance and reliability are non-negotiable.",
  },
  {
    question: "Do you offer ongoing support after deployment?",
    answer: "Yes. All enterprise plans include 24/7 monitoring, SLA-backed support, and dedicated account management. We also offer optional managed services for teams that want us to handle infrastructure, model updates, and performance optimization on an ongoing basis.",
  },
  {
    question: "What does your pricing model look like?",
    answer: "We offer flexible pricing: project-based for fixed scope, retainer for ongoing development, and usage-based for platform deployments. Every engagement starts with a free Discovery session to scope the work and align on budget before any commitment.",
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We are SOC 2 Type II certified, GDPR compliant, and HIPAA ready. All data is encrypted at rest and in transit. We support on-premise and private cloud deployments for clients with strict data residency requirements. We never use client data for model training without explicit consent.",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer: "Absolutely. Our AI solutions integrate with any modern tech stack — AWS, GCP, Azure, custom infrastructure. We support all major programming languages and frameworks. Our first step is always a technical audit to understand your current architecture and identify the best integration approach.",
  },
];

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NovaLabs AI. Book a free AI strategy session, discuss automation, intelligent agents, enterprise integrations, or custom AI development with our specialists.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | NovaLabs AI",
    description:
      "Get in touch with NovaLabs AI. Book a free AI strategy session, discuss automation, intelligent agents, enterprise integrations, or custom AI development with our specialists.",
    url: "/contact",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Contact NovaLabs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | NovaLabs AI",
    description:
      "Get in touch with NovaLabs AI. Book a free AI strategy session, discuss automation, intelligent agents, enterprise integrations, or custom AI development with our specialists.",
    images: ["/og.png"],
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="Contact Us | NovaLabs AI"
        description="Get in touch with NovaLabs AI. Book a free AI strategy session, discuss automation, intelligent agents, enterprise integrations, or custom AI development with our specialists."
        path="/contact"
        image="/og.png"
      />
      <FAQJsonLd items={CONTACT_FAQ_ITEMS} />
      <HeroContact />
      <LazyContactSections />
    </main>
  );
}
