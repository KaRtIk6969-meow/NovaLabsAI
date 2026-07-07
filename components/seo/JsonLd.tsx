import { siteConfig } from "@/config";

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.mail.support,
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebPageJsonLdProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

function WebPageJsonLd({ title, description, path, image }: WebPageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}${path}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${image}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ServiceJsonLdProps {
  services: Array<{
    name: string;
    description: string;
    url: string;
  }>;
}

function ServiceJsonLd({ services }: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: `${siteConfig.url}${service.url}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProductJsonLdProps {
  plans: Array<{
    name: string;
    description: string;
    price: string;
    priceCurrency?: string;
  }>;
}

function ProductJsonLd({ plans }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NovaLabs AI Pricing Plans",
    itemListElement: plans.map((plan) => ({
      "@type": "Product",
      name: plan.name,
      description: plan.description,
      offers: {
        "@type": "Offer",
        price: plan.price,
        priceCurrency: plan.priceCurrency || "USD",
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/pricing`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  items: FAQItem[];
}

function FAQJsonLd({ items }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export {
  OrganizationJsonLd,
  WebsiteJsonLd,
  WebPageJsonLd,
  BreadcrumbJsonLd,
  ServiceJsonLd,
  ProductJsonLd,
  FAQJsonLd,
};
