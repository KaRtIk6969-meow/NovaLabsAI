import type { Metadata } from "next";
import { HeroBlog } from "@/components/blog/HeroBlog";
import { LazyBlogPageSections } from "@/components/blog/LazyBlogPageSections";
import { WebPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Enterprise AI Blog",
  description:
    "Deep technical insights, engineering breakthroughs, and practical guides on enterprise AI, LLMs, RAG pipelines, AI agents, and workflow automation from the NovaLabs AI team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Enterprise AI Blog | NovaLabs AI",
    description:
      "Deep technical insights, engineering breakthroughs, and practical guides on enterprise AI, LLMs, RAG pipelines, AI agents, and workflow automation.",
    url: "/blog",
    siteName: "NovaLabs AI",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Enterprise AI Blog | NovaLabs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Blog | NovaLabs AI",
    description:
      "Deep technical insights, engineering breakthroughs, and practical guides on enterprise AI, LLMs, RAG pipelines, AI agents, and workflow automation.",
    images: ["/og.png"],
  },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="flex-1">
      <WebPageJsonLd
        title="Enterprise AI Blog | NovaLabs AI"
        description="Deep technical insights, engineering breakthroughs, and practical guides on enterprise AI, LLMs, RAG pipelines, AI agents, and workflow automation from the NovaLabs AI team."
        path="/blog"
        image="/og.png"
      />
      <HeroBlog />
      <LazyBlogPageSections />
    </main>
  );
}
