import type { Metadata } from "next";
import { HeroAbout } from "@/components/about/HeroAbout";
import { LazyAboutSections } from "@/components/about/LazyAboutSections";
import { WebPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About NovaLabs AI",
  description:
    "Learn about NovaLabs AI — our mission, team, values, and the enterprise AI infrastructure powering autonomous workflows for 500+ companies worldwide.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About NovaLabs AI",
    description:
      "Learn about NovaLabs AI — our mission, team, values, and the enterprise AI infrastructure powering autonomous workflows for 500+ companies worldwide.",
    url: "/about",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "About NovaLabs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About NovaLabs AI",
    description:
      "Learn about NovaLabs AI — our mission, team, values, and the enterprise AI infrastructure powering autonomous workflows for 500+ companies worldwide.",
    images: ["/og.png"],
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="About NovaLabs AI"
        description="Learn about NovaLabs AI — our mission, team, values, and the enterprise AI infrastructure powering autonomous workflows for 500+ companies worldwide."
        path="/about"
        image="/og.png"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      <HeroAbout />
      <LazyAboutSections />
    </main>
  );
}
