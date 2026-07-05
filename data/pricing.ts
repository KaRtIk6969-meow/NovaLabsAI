import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Everything in Starter, plus:",
    features: [
      "1,000 Automations / mo",
      "Basic AI Agents",
      "Email Support",
    ],
    cta: "Get Started",
    href: "/pricing",
  },
  {
    name: "Pro",
    price: "$149",
    period: "/month",
    description: "Everything in Pro, plus:",
    features: [
      "10,000 Automations / mo",
      "Advanced AI Agents",
      "Priority Support",
      "Custom Integrations",
    ],
    cta: "Get Started",
    href: "/pricing",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Everything in Enterprise, plus:",
    features: [
      "Unlimited Automations",
      "Custom AI Solutions",
      "Dedicated Support",
      "SLA & Onboarding",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];
