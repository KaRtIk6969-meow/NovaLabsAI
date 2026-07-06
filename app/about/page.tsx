import { HeroAbout } from "@/components/about/HeroAbout";
import { LazyAboutSections } from "@/components/about/LazyAboutSections";

export const metadata = {
  title: "About | NovaLabs AI",
  description:
    "Learn about NovaLabs AI — our mission, team, values, and the enterprise AI infrastructure powering autonomous workflows for 500+ companies worldwide.",
  openGraph: {
    title: "About | NovaLabs AI",
    description:
      "Learn about NovaLabs AI — our mission, team, values, and the enterprise AI infrastructure powering autonomous workflows for 500+ companies worldwide.",
    url: "https://novolabs.ai/about",
    siteName: "NovaLabs AI",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <HeroAbout />
      <LazyAboutSections />
    </main>
  );
}
