import type { Metadata } from "next";
import NotFoundContent from "@/components/not-found/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found. Return to NovaLabs AI to explore our enterprise AI automation solutions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
