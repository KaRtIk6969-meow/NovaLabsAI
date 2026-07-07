import { HeroContact } from "@/components/contact/HeroContact";
import { LazyContactSections } from "@/components/contact/LazyContactSections";

export const metadata = {
  title: "Contact | NovaLabs AI",
  description:
    "Get in touch with NovaLabs AI. Book a free AI strategy session, discuss automation, intelligent agents, enterprise integrations, or custom AI development with our specialists.",
  openGraph: {
    title: "Contact | NovaLabs AI",
    description:
      "Get in touch with NovaLabs AI. Book a free AI strategy session, discuss automation, intelligent agents, enterprise integrations, or custom AI development with our specialists.",
    url: "https://novolabs.ai/contact",
    siteName: "NovaLabs AI",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <HeroContact />
      <LazyContactSections />
    </main>
  );
}
