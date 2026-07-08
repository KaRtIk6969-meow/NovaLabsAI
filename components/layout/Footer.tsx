"use client";

import { useState, useCallback, useRef, useEffect, memo } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { siteConfig } from "@/config/site";
import { footerLinks } from "@/data/footer";
import { easing, staggerContainer, reveal } from "@/design-system";

const ease = easing.default;
const blurFadeUp = reveal.blurFadeUp;
const fadeIn = reveal.fadeIn;

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = staggerContainer(0.08, 0.1);

const fadeUp = blurFadeUp;

/* ═══════════════════════════════════════════
   SOCIAL ICONS
   ═══════════════════════════════════════════ */

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
        <path
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: siteConfig.links.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
        <path
          d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
        <path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 18c-4.51 2-5-2-7-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════
   MAGNETIC SOCIAL ICON
   ═══════════════════════════════════════════ */

const MagneticSocialIcon = memo(function MagneticSocialIcon({
  link,
  index,
}: {
  link: (typeof SOCIAL_LINKS)[number];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.3);
      y.set((e.clientY - cy) * 0.3);
    },
    [x, y, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08, ease }}
      className="group relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-hairline bg-glass/60 backdrop-blur-md text-text-muted transition-[border-color,background-color,color,box-shadow,transform] duration-300 hover:border-accent-blue/40 hover:bg-accent-blue/[0.08] hover:text-text hover:shadow-[0_0_24px_var(--svg-link-dim)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {/* Animated border ring on hover */}
      <div className="absolute -inset-px rounded-full bg-gradient-to-br from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none blur-sm" aria-hidden="true" />
      {/* Inner glow fill */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {link.icon}
      </span>
    </motion.a>
  );
});

/* ═══════════════════════════════════════════
   FOOTER LINK GROUP
   ═══════════════════════════════════════════ */

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text tracking-tight mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group/link relative text-sm text-text-secondary transition-colors duration-300 hover:text-text inline-block"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan transition-[width] duration-300 group-hover/link:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NEWSLETTER FORM
   ═══════════════════════════════════════════ */

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    },
    [email]
  );

  return (
    <div>
      <h3 className="text-sm font-semibold text-text tracking-tight mb-2">
        Stay Updated
      </h3>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        Monthly AI insights, product updates and enterprise automation strategies.
      </p>
      <form onSubmit={handleSubmit} className="relative" aria-label="Newsletter signup">
        <div className="relative group">
          {/* Gradient border glow on focus */}
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-accent-blue/25 via-accent-violet/20 to-accent-cyan/25 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" aria-hidden="true" />

          <div className="relative flex rounded-xl border border-hairline bg-canvas-raised/80 backdrop-blur-md overflow-hidden transition-[border-color,box-shadow] duration-300 group-focus-within:border-accent-blue/30 group-focus-within:shadow-[0_0_20px_var(--svg-link-dim)]">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              aria-label="Email address for newsletter"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="relative px-5 py-3 rounded-xl text-sm font-medium text-white overflow-hidden whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-raised"
              aria-label="Subscribe to newsletter"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-blue bg-[length:200%_100%] animate-[border-rotate_4s_linear_infinite]" />
              <span className="relative z-10 flex items-center gap-1.5">
                {isSubmitted ? (
                  <motion.svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-5 h-5 mx-auto"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    role="status"
                    aria-live="polite"
                  >
                    <path
                      d="M5 10l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ) : (
                  <>
                    Subscribe
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </form>
      {/* Trust note */}
      <div className="flex items-center gap-3 mt-3 text-[11px] text-text-muted">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-accent-cyan" aria-hidden="true">
            <path d="M3.5 7.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          No spam
        </span>
        <span className="w-px h-3 bg-hairline" aria-hidden="true" />
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-accent-cyan" aria-hidden="true">
            <path d="M3.5 7.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Monthly AI insights
        </span>
        <span className="w-px h-3 bg-hairline" aria-hidden="true" />
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-accent-cyan" aria-hidden="true">
            <path d="M3.5 7.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Unsubscribe anytime
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LOGO
   ═══════════════════════════════════════════ */

function FooterLogo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 mb-4"
      aria-label="NovaLabs AI - Home"
    >
      <div className="relative flex items-center justify-center w-9 h-9 rounded-[10px] bg-gradient-to-br from-accent-blue via-accent-violet to-accent-cyan shadow-lg shadow-accent-blue/20 transition-[box-shadow,transform] duration-300 group-hover:shadow-accent-blue/40 group-hover:scale-[1.02]">
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 relative z-10"
          aria-hidden="true"
        >
          <path
            d="M4 4h4v16H4V4zM16 4h4v16h-4V4zM4 4l16 16V4h4v16L4 4"
            fill="white"
            fillOpacity="0.9"
          />
          <circle cx="18" cy="6" r="2.5" fill="var(--svg-cyan)" />
        </svg>
      </div>
      <span className="text-[17px] font-semibold text-text tracking-tight">
        NovaLabs{" "}
        <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </Link>
  );
}

/* ═══════════════════════════════════════════
   TRUST BADGES
   ═══════════════════════════════════════════ */

const TRUST_BADGES = [
  { label: "SOC 2", icon: "shield" },
  { label: "GDPR", icon: "lock" },
  { label: "ISO 27001", icon: "cert" },
  { label: "99.99% Uptime", icon: "uptime" },
] as const;

function TrustBadges() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-6 border-t border-b border-hairline/40"
    >
      {TRUST_BADGES.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease }}
          className="flex items-center gap-2 text-text-muted"
        >
          {badge.icon === "shield" && (
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M8 1.5l5.5 2.5v4c0 3.5-2.5 6.5-5.5 7.5-3-1-5.5-4-5.5-7.5v-4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M5.5 8l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {badge.icon === "lock" && (
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
          {badge.icon === "cert" && (
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="8" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.5 10.5l-1 4 3.5-2 3.5 2-1-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 6.5l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {badge.icon === "uptime" && (
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="text-[11px] font-medium tracking-wide uppercase">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   BOTTOM BAR
   ═══════════════════════════════════════════ */

const BOTTOM_LINKS = [
  { label: "Privacy Policy", href: "/about" },
  { label: "Terms of Service", href: "/about" },
  { label: "Cookie Policy", href: "/about" },
];

function BottomBar() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="mt-10"
    >
      <TrustBadges />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <span className="hidden sm:inline text-text-muted/30" aria-hidden="true">
            &middot;
          </span>
          <p className="text-[11px] text-text-muted/60">
            Built with Next.js 16 &bull; React 19 &bull; TypeScript
          </p>
        </div>
        <div className="flex items-center gap-5">
          {BOTTOM_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group/footerlink relative text-[13px] text-text-muted transition-colors duration-300 hover:text-text-secondary"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-accent-blue to-accent-violet transition-[width] duration-300 group-hover/footerlink:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   AURORA BACKGROUND
   ═══════════════════════════════════════════ */

function AuroraBackground({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Subtle moving grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 55% 45% at 50% 50%, black 10%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 45% at 50% 50%, black 10%, transparent 65%)",
        }}
      />

      {/* Aurora gradient — main breathing glow (CSS animation) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[600px] rounded-full blur-[200px] ${shouldReduceMotion ? '' : 'animate-footer-aurora-1'}`}
        style={{
          background:
            "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 35%, var(--svg-cyan) 60%, transparent 80%)",
        }}
      />

      {/* Secondary aurora blob — left (CSS animation) */}
      <div
        className={`absolute top-1/4 left-[5%] w-[500px] h-[500px] rounded-full blur-[180px] ${shouldReduceMotion ? '' : 'animate-footer-aurora-2'}`}
        style={{
          background: "radial-gradient(circle, rgba(121,40,202,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Secondary aurora blob — right (CSS animation) */}
      <div
        className={`absolute bottom-0 right-[8%] w-[450px] h-[450px] rounded-full blur-[160px] ${shouldReduceMotion ? '' : 'animate-footer-aurora-3'}`}
        style={{
          background: "radial-gradient(circle, rgba(80,227,194,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Subtle radial spotlight — top center (CSS animation) */}
      {!shouldReduceMotion && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[180px] animate-footer-aurora-4"
          style={{ background: "radial-gradient(ellipse, rgba(0,112,243,0.04) 0%, transparent 70%)" }}
        />
      )}

      {/* Warm drift accent (CSS animation) */}
      {!shouldReduceMotion && (
        <div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[150px] animate-footer-aurora-5"
          style={{ background: "radial-gradient(circle, rgba(255,0,128,0.02) 0%, transparent 70%)" }}
        />
      )}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Depth gradient — blends into canvas at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/30 via-transparent to-canvas" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN FOOTER
   ═══════════════════════════════════════════ */

export function Footer() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  const companyLinks = footerLinks.find((col) => col.title === "Company")?.links ?? [];
  const resourcesLinks = footerLinks.find((col) => col.title === "Resources")?.links ?? [];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onVisibility = () => {
      el.classList.toggle("bg-animations-paused", document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [sectionRef]);

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden contain-layout contain-paint"
    >
      {/* ── Transition from previous section ── */}
      {/* Breathing space */}
      <div className="h-20 sm:h-24 lg:h-[120px]" aria-hidden="true" />

      {/* Aurora fade — blends previous section into footer */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/80 to-transparent" />
        <div
          className={`absolute inset-0 ${shouldReduceMotion ? '' : 'animate-footer-aurora-fade'}`}
          style={{
            background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(121,40,202,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Glowing top divider */}
      <div className="absolute top-0 inset-x-0 h-px" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent" />
        {!shouldReduceMotion && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-violet/15 to-transparent animate-footer-divider"
          />
        )}
      </div>

      {/* Full-width glassmorphism section */}
      <div className="relative border-t border-hairline/40 bg-canvas-raised/30 backdrop-blur-lg sm:backdrop-blur-xl">
        {/* Aurora background */}
        <AuroraBackground
          shouldReduceMotion={shouldReduceMotion}
        />

        {/* Soft drifting particles */}
        {!shouldReduceMotion && shouldAnimate && (
          <Particles count={8} speed={0.015} maxSize={0.7} />
        )}

        {/* Main content */}
        <Container className="relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="pt-16 sm:pt-20 lg:pt-24"
          >
            {/* Top section: Logo + Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-10 lg:gap-8">
              {/* Column 1: Brand */}
              <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
                <FooterLogo />
                <p className="text-sm text-text-secondary leading-relaxed max-w-[280px] mb-6">
                  Enterprise AI infrastructure for autonomous workflows, intelligent agents and operational scale.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((link, i) => (
                    <MagneticSocialIcon key={link.label} link={link} index={i} />
                  ))}
                </div>
              </motion.div>

              {/* Column 2: Company */}
              <motion.div variants={fadeUp}>
                <FooterLinkGroup
                  title="Company"
                  links={companyLinks}
                />
              </motion.div>

              {/* Column 3: Resources */}
              <motion.div variants={fadeUp}>
                <FooterLinkGroup
                  title="Resources"
                  links={resourcesLinks}
                />
              </motion.div>

              {/* Column 4: Newsletter */}
              <motion.div variants={fadeUp}>
                <NewsletterForm />
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <BottomBar />
          </motion.div>
        </Container>
      </div>
    </footer>
  );
}
