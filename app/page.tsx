import type { Metadata } from "next";
import { Hero } from "@/components/sections";
import { LazySections } from "@/components/sections/LazySections";
import { WebPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "NovaLabs AI - Enterprise AI Automation",
  description:
    "NovaLabs AI helps businesses automate workflows, extract intelligence from data, and build AI solutions that drive real growth.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NovaLabs AI - Enterprise AI Automation",
    description:
      "NovaLabs AI helps businesses automate workflows, extract intelligence from data, and build AI solutions that drive real growth.",
    url: "/",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NovaLabs AI - Enterprise AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaLabs AI - Enterprise AI Automation",
    description:
      "NovaLabs AI helps businesses automate workflows, extract intelligence from data, and build AI solutions that drive real growth.",
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="NovaLabs AI - Enterprise AI Automation"
        description="NovaLabs AI helps businesses automate workflows, extract intelligence from data, and build AI solutions that drive real growth."
        path="/"
        image="/og.png"
      />
      <Hero />
      <LazySections />
    </main>
  );
}
