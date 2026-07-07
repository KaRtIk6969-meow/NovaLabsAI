import type { Metadata } from "next";
import { HeroCaseStudies } from "@/components/case-studies/HeroCaseStudies";
import { LazyCaseStudyPageSections } from "@/components/case-studies/LazyCaseStudyPageSections";
import { WebPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Enterprise AI Case Studies",
  description:
    "See how enterprise organizations automate operations, reduce costs, and increase productivity with NovaLabs AI. Real case studies from healthcare, manufacturing, finance, retail, and logistics.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Enterprise AI Case Studies | NovaLabs AI",
    description:
      "See how enterprise organizations automate operations, reduce costs, and increase productivity with NovaLabs AI.",
    url: "/case-studies",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NovaLabs AI Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Case Studies | NovaLabs AI",
    description:
      "See how enterprise organizations automate operations, reduce costs, and increase productivity with NovaLabs AI.",
    images: ["/og.png"],
  },
};

export default function CaseStudiesPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="Enterprise AI Case Studies | NovaLabs AI"
        description="See how enterprise organizations automate operations, reduce costs, and increase productivity with NovaLabs AI."
        path="/case-studies"
        image="/og.png"
      />
      <HeroCaseStudies />
      <LazyCaseStudyPageSections />
    </main>
  );
}
