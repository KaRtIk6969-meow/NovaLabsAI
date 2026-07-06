import { HeroServices } from "@/components/services/HeroServices";
import { LazyServicesSections } from "@/components/services/LazyServicesSections";

export const metadata = {
  title: "Services | NovaLabs AI",
  description:
    "Enterprise AI services — autonomous agents, workflow automation, custom AI development, data intelligence, and enterprise integrations. From strategy to production.",
  openGraph: {
    title: "Services | NovaLabs AI",
    description:
      "Enterprise AI services — autonomous agents, workflow automation, custom AI development, data intelligence, and enterprise integrations.",
    url: "https://novolabs.ai/services",
    siteName: "NovaLabs AI",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <HeroServices />
      <LazyServicesSections />
    </main>
  );
}
