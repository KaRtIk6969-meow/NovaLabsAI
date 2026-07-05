export type NavLink = {
  label: string;
  href: string;
};

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
};

export type Service = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
};

export type CaseStudy = {
  title: string;
  client: string;
  result: string;
  excerpt: string;
  slug: string;
  image?: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};
