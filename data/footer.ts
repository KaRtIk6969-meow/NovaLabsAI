import type { FooterColumn } from "@/types";

export const footerLinks: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "AI Agents", href: "/services" },
      { label: "Workflow Automation", href: "/services" },
      { label: "Document Intelligence", href: "/services" },
      { label: "Integrations", href: "/services" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Finance", href: "/services" },
      { label: "Healthcare", href: "/services" },
      { label: "E-commerce", href: "/services" },
      { label: "Real Estate", href: "/services" },
      { label: "Logistics", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Documentation", href: "/blog" },
      { label: "Guides", href: "/blog" },
      { label: "Help Center", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Partners", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/about" },
    ],
  },
];
