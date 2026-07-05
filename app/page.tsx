import { Hero, TrustedCompanies, Features, Metrics, AISolutions } from "@/components/sections";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <TrustedCompanies />
      <Features />
      <Metrics />
      <AISolutions />
    </main>
  );
}
