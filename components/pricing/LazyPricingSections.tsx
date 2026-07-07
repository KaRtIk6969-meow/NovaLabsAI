"use client";

import { PricingPlans } from "@/components/pricing/PricingPlans";
import { CostCalculator } from "@/components/pricing/CostCalculator";
import { FeatureComparison } from "@/components/pricing/FeatureComparison";
import { ROICalculator } from "@/components/pricing/ROICalculator";
import { ImplementationTimeline } from "@/components/pricing/ImplementationTimeline";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { CTAPricing } from "@/components/pricing/CTAPricing";

export function LazyPricingSections() {
  return (
    <>
      <PricingPlans />
      <CostCalculator />
      <ROICalculator />
      <FeatureComparison />
      <ImplementationTimeline />
      <PricingFAQ />
      <CTAPricing />
    </>
  );
}
