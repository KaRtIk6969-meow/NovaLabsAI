import type { Metadata } from "next";
import { HeroPricing } from "@/components/pricing/HeroPricing";
import { LazyPricingPageSections } from "@/components/pricing/LazyPricingPageSections";
import { WebPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Enterprise AI Pricing",
  description:
    "Transparent, scalable pricing for enterprise AI automation. Compare plans, calculate ROI, and find the right AI solution for your organization. 14-day free trial.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Enterprise AI Pricing | NovaLabs AI",
    description:
      "Transparent, scalable pricing for enterprise AI automation. Compare plans, calculate ROI, and find the right AI solution.",
    url: "/pricing",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Enterprise AI Pricing | NovaLabs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Pricing | NovaLabs AI",
    description:
      "Transparent, scalable pricing for enterprise AI automation. Compare plans, calculate ROI, and find the right AI solution.",
    images: ["/og.png"],
  },
};

export default function PricingPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="Enterprise AI Pricing | NovaLabs AI"
        description="Transparent, scalable pricing for enterprise AI automation. Compare plans, calculate ROI, and find the right AI solution for your organization."
        path="/pricing"
        image="/og.png"
      />
      <HeroPricing />
      <LazyPricingPageSections />
    </main>
  );
}
