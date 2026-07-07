"use client";

import { useState } from "react";
import { FeaturedCaseStudy } from "@/components/case-studies/FeaturedCaseStudy";
import { IndustryFilter } from "@/components/case-studies/IndustryFilter";
import { BeforeAfterComparison } from "@/components/case-studies/BeforeAfterComparison";
import { ArchitectureExplorer } from "@/components/case-studies/ArchitectureExplorer";
import { DeliveryTimeline } from "@/components/case-studies/DeliveryTimeline";
import { TechStack } from "@/components/case-studies/TechStack";
import { ClientTestimonial } from "@/components/case-studies/ClientTestimonial";
import { ResultsDashboard } from "@/components/case-studies/ResultsDashboard";
import { RelatedCaseStudies } from "@/components/case-studies/RelatedCaseStudies";
import { CTASection } from "@/components/case-studies/CTASection";
import type { IndustryFilter as FilterType } from "@/data/case-studies";

export function LazyCaseStudySections() {
  const [filter, setFilter] = useState<FilterType>("All");

  return (
    <>
      <FeaturedCaseStudy />
      <IndustryFilter active={filter} onChange={setFilter} />
      <BeforeAfterComparison />
      <ArchitectureExplorer />
      <DeliveryTimeline />
      <TechStack />
      <ClientTestimonial />
      <ResultsDashboard />
      <RelatedCaseStudies />
      <CTASection />
    </>
  );
}
