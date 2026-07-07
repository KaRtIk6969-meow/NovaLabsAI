import type { Metadata } from "next";
import { HeroSolutions } from "@/components/solutions/HeroSolutions";
import { LazySolutionsSections } from "@/components/solutions/LazySolutionsSections";
import { WebPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Enterprise AI Solutions",
  description:
    "Enterprise AI solutions — autonomous agents, workflow automation, data intelligence, and custom integrations built for scale, security, and reliability.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Enterprise AI Solutions | NovaLabs AI",
    description:
      "Enterprise AI solutions — autonomous agents, workflow automation, data intelligence, and custom integrations built for scale, security, and reliability.",
    url: "/solutions",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Enterprise AI Solutions | NovaLabs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Solutions | NovaLabs AI",
    description:
      "Enterprise AI solutions — autonomous agents, workflow automation, data intelligence, and custom integrations built for scale, security, and reliability.",
    images: ["/og.png"],
  },
};

export default function SolutionsPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="Enterprise AI Solutions | NovaLabs AI"
        description="Enterprise AI solutions — autonomous agents, workflow automation, data intelligence, and custom integrations built for scale, security, and reliability."
        path="/solutions"
        image="/og.png"
      />
      <HeroSolutions />
      <LazySolutionsSections />
    </main>
  );
}
