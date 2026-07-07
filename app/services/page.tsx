import type { Metadata } from "next";
import { HeroServices } from "@/components/services/HeroServices";
import { LazyServicesSections } from "@/components/services/LazyServicesSections";
import { WebPageJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

const SERVICES_FAQ_ITEMS = [
  {
    question: "How long does a typical enterprise AI engagement take?",
    answer: "Most engagements follow a 3-phase model: Discovery (2-4 weeks), MVP Development (6-10 weeks), and Production Deployment (4-6 weeks). Total timeline is typically 3-5 months depending on complexity. We also offer accelerated timelines for urgent use cases.",
  },
  {
    question: "Do we need to have our data ready before starting?",
    answer: "No. We include a data readiness assessment as part of our Discovery phase. Our team will help you identify, clean, and structure the data needed for your AI systems. We work with messy, siloed, and incomplete data — that's our specialty.",
  },
  {
    question: "What does the ROI typically look like?",
    answer: "Our enterprise customers see an average 340% ROI within the first year. Common value drivers include: 60-80% reduction in manual processing time, 40-60% fewer errors, and 2-3x faster decision-making. We provide detailed ROI modeling during the Discovery phase.",
  },
  {
    question: "How do you handle data security and compliance?",
    answer: "We're SOC 2 Type II, GDPR, and ISO 27001 compliant. All data processing can be done within your infrastructure (on-premise or private cloud). We never use customer data for model training, and all systems include full audit trails and encryption at rest and in transit.",
  },
  {
    question: "Can you integrate with our existing tech stack?",
    answer: "Yes. We have pre-built connectors for 200+ enterprise tools including SAP, Salesforce, ServiceNow, Snowflake, Databricks, and custom APIs. Our Integration team ensures AI systems work seamlessly within your current technology ecosystem.",
  },
  {
    question: "What happens after deployment?",
    answer: "We provide ongoing optimization, monitoring, and support. This includes model retraining, performance tuning, and feature development. Every customer gets a dedicated Solutions Architect and access to 24/7 support. Our SLA guarantees 99.99% uptime.",
  },
];

export const metadata: Metadata = {
  title: "Enterprise AI Services",
  description:
    "Enterprise AI services — autonomous agents, workflow automation, custom AI development, data intelligence, and enterprise integrations. From strategy to production.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Enterprise AI Services | NovaLabs AI",
    description:
      "Enterprise AI services — autonomous agents, workflow automation, custom AI development, data intelligence, and enterprise integrations.",
    url: "/services",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Enterprise AI Services | NovaLabs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Services | NovaLabs AI",
    description:
      "Enterprise AI services — autonomous agents, workflow automation, custom AI development, data intelligence, and enterprise integrations.",
    images: ["/og.png"],
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="Enterprise AI Services | NovaLabs AI"
        description="Enterprise AI services — autonomous agents, workflow automation, custom AI development, data intelligence, and enterprise integrations. From strategy to production."
        path="/services"
        image="/og.png"
      />
      <FAQJsonLd items={SERVICES_FAQ_ITEMS} />
      <HeroServices />
      <LazyServicesSections />
    </main>
  );
}
