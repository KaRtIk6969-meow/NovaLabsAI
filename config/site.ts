export const siteConfig = {
  name: "NovaLabs AI",
  tagline: "Enterprise AI Automation",
  description:
    "NovaLabs AI helps businesses automate workflows, extract intelligence from data, and build AI solutions that drive real growth.",
  url: "https://novalabs.ai",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/novalabsai",
    github: "https://github.com/novalabsai",
    linkedin: "https://linkedin.com/company/novalabsai",
  },
  mail: {
    support: "support@novalabs.ai",
    sales: "sales@novalabs.ai",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/blog" },
    { label: "Company", href: "/about" },
  ],
} as const;
