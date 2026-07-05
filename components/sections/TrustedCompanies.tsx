"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks";

const COMPANIES = [
  {
    name: "Helix Systems",
    logo: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto shrink-0" aria-hidden="true">
        <path d="M4 8l6 8-6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 8l6 8-6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <text x="24" y="21" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.01em">Helix Systems</text>
      </svg>
    ),
  },
  {
    name: "Nexora",
    logo: (
      <svg viewBox="0 0 110 32" fill="none" className="h-7 w-auto shrink-0" aria-hidden="true">
        <circle cx="12" cy="16" r="8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 16l3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="26" y="21" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.01em">Nexora</text>
      </svg>
    ),
  },
  {
    name: "Lumina AI",
    logo: (
      <svg viewBox="0 0 120 32" fill="none" className="h-7 w-auto shrink-0" aria-hidden="true">
        <circle cx="12" cy="16" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 7v4M12 21v4M7 16h4M17 16h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" />
        <text x="27" y="21" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.01em">Lumina AI</text>
      </svg>
    ),
  },
  {
    name: "Vertex Cloud",
    logo: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto shrink-0" aria-hidden="true">
        <polygon points="12,4 20,12 20,20 12,28 4,20 4,12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M12 10v12M8 16h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <text x="27" y="21" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.01em">Vertex Cloud</text>
      </svg>
    ),
  },
  {
    name: "Orion Tech",
    logo: (
      <svg viewBox="0 0 130 32" fill="none" className="h-7 w-auto shrink-0" aria-hidden="true">
        <circle cx="12" cy="16" r="9" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="16" r="3" fill="currentColor" />
        <path d="M12 7v2M12 23v2M3.5 12l1.7 1M18.8 21l1.7 1M3.5 20l1.7-1M18.8 11l1.7-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <text x="27" y="21" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.01em">Orion Tech</text>
      </svg>
    ),
  },
  {
    name: "Apex Digital",
    logo: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto shrink-0" aria-hidden="true">
        <path d="M4 24l8-16 8 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 19h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <text x="24" y="21" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.01em">Apex Digital</text>
      </svg>
    ),
  },
];

function CompanyLogo({ company, index }: { company: (typeof COMPANIES)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2 + index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group flex items-center justify-center px-5 py-4 snap-center"
      aria-label={company.name}
    >
      <div className="relative flex items-center justify-center text-text-muted/70 opacity-70 grayscale transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-text-secondary group-hover:scale-[1.05] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.06)]">
        {company.logo}
      </div>
    </motion.div>
  );
}

export function TrustedCompanies() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative pt-6 pb-20 sm:pt-8 sm:pb-24 overflow-hidden"
      aria-label="Trusted companies"
    >
      {/* Top gradient — receives the Hero fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Soft blur bridge — blends Hero glows into this section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/[0.03] rounded-full blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.015] rounded-full blur-[100px]" />
      </div>

      {/* Very subtle grid continuation */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 50% 40% at 50% 50%, black 10%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 40% at 50% 50%, black 10%, transparent 70%)",
          }}
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-12"
        >
          <h2 className="text-lg sm:text-xl font-medium tracking-tight bg-gradient-to-r from-text-secondary via-text to-text-secondary bg-clip-text text-transparent">
            Trusted by ambitious teams building the future
          </h2>
          <p className="mt-3 text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
            Helping innovative companies automate, scale and grow with enterprise AI.
          </p>
        </motion.div>

        {/* Desktop: 6-col grid | Tablet: 3-col | Mobile: horizontal scroll */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-x-6 lg:items-center lg:justify-items-center">
          {COMPANIES.map((company, i) => (
            <CompanyLogo key={company.name} company={company} index={i} />
          ))}
        </div>

        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-x-6 sm:items-center sm:justify-items-center lg:hidden">
          {COMPANIES.map((company, i) => (
            <CompanyLogo key={company.name} company={company} index={i} />
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:hidden scrollbar-hide">
          {COMPANIES.map((company, i) => (
            <CompanyLogo key={company.name} company={company} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
