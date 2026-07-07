"use client";

import { useState, useMemo } from "react";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { SearchBar } from "@/components/blog/SearchBar";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { TrendingArticles } from "@/components/blog/TrendingArticles";
import { NewsletterSubscribe } from "@/components/blog/NewsletterSubscribe";
import { PopularTopics } from "@/components/blog/PopularTopics";
import { CTABlog } from "@/components/blog/CTABlog";
import { ARTICLES, type BlogCategory } from "@/data/blog";

export function LazyBlogSections() {
  const [category, setCategory] = useState<BlogCategory>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = ARTICLES;
    if (category !== "All") {
      result = result.filter((a) => a.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, search]);

  return (
    <>
      <FeaturedArticle />
      <TrendingArticles />

      <section id="all-articles" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter active={category} onChange={setCategory} />
          <SearchBar value={search} onChange={setSearch} />
          <ArticleGrid articles={filtered} />
        </div>
      </section>

      <PopularTopics />
      <NewsletterSubscribe />
      <CTABlog />
    </>
  );
}
