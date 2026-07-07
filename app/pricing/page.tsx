import type { Metadata } from "next";
import { HeroPricing } from "@/components/pricing/HeroPricing";
import { LazyPricingPageSections } from "@/components/pricing/LazyPricingPageSections";
import { WebPageJsonLd, BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";

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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />
      <ProductJsonLd
        plans={[
          { name: "Starter", description: "For teams exploring AI automation. 1 AI agent, 5,000 tasks/month, email support.", price: "499", priceCurrency: "USD" },
          { name: "Growth", description: "For growing businesses scaling AI operations. 5 AI agents, 50,000 tasks/month, priority support.", price: "1499", priceCurrency: "USD" },
          { name: "Enterprise", description: "For organizations requiring full AI infrastructure. Unlimited agents, custom SLA, dedicated support.", price: "4999", priceCurrency: "USD" },
        ]}
      />
      <HeroPricing />
      <LazyPricingPageSections />
    </main>
  );
}
