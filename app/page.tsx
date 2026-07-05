import { Hero } from "@/components/sections";
import { LazySections } from "@/components/sections/LazySections";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <LazySections />
    </main>
  );
}
