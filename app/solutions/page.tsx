import { HeroSolutions } from "@/components/solutions/HeroSolutions";
import { LazySolutionsSections } from "@/components/solutions/LazySolutionsSections";

export const metadata = {
  title: "Solutions | NovaLabs AI",
  description:
    "Enterprise AI solutions — autonomous agents, workflow automation, data intelligence, and custom integrations built for scale, security, and reliability.",
  openGraph: {
    title: "Solutions | NovaLabs AI",
    description:
      "Enterprise AI solutions — autonomous agents, workflow automation, data intelligence, and custom integrations built for scale, security, and reliability.",
    url: "https://novolabs.ai/solutions",
    siteName: "NovaLabs AI",
    type: "website",
  },
};

export default function SolutionsPage() {
  return (
    <main className="flex-1">
      <HeroSolutions />
      <LazySolutionsSections />
    </main>
  );
}
