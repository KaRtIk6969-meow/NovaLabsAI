"use client";

import dynamic from "next/dynamic";

const LazyBlogSections = dynamic(
  () =>
    import("@/components/blog/LazyBlogSections").then(
      (m) => ({ default: m.LazyBlogSections })
    ),
  { ssr: false, loading: () => null }
);

export function LazyBlogPageSections() {
  return <LazyBlogSections />;
}
