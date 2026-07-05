"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { useMobileMenu, useScrollPosition } from "@/hooks";
import { navigation } from "@/data";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

function Logo() {
  return (
    <Link
      href="/"
      className="relative flex items-center gap-2.5 group"
      aria-label="NovaLabs AI - Home"
    >
      <div className="relative flex items-center justify-center w-9 h-9 rounded-[10px] bg-gradient-to-br from-primary via-primary-light to-accent-cyan shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-[1.02]">
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
          <circle cx="18" cy="6" r="2.5" fill="#06B6D4" />
        </svg>
      </div>
      <span className="text-[17px] font-semibold text-text tracking-tight">
        NovaLabs{" "}
        <span className="bg-gradient-to-r from-primary-light to-accent-cyan bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 outline-none",
        isActive
          ? "text-text"
          : "text-text-secondary hover:text-text hover:bg-white/[0.04]"
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="navbar-active-pill"
          className="absolute inset-x-1 -bottom-[1px] h-[2px] bg-gradient-to-r from-primary to-accent-blue rounded-full"
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
      )}
    </Link>
  );
}

function MobileMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center lg:hidden rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="w-[18px] flex flex-col gap-[5px]">
        <motion.span
          animate={
            isOpen
              ? { rotate: 45, y: 7, scaleX: 1 }
              : { rotate: 0, y: 0, scaleX: 1 }
          }
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-[1.5px] bg-text block origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="w-[60%] h-[1.5px] bg-text block"
        />
        <motion.span
          animate={
            isOpen
              ? { rotate: -45, y: -7, scaleX: 1 }
              : { rotate: 0, y: 0, scaleX: 1 }
          }
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-[1.5px] bg-text block origin-center"
        />
      </div>
    </button>
  );
}

function MobileMenu({
  isOpen,
  pathname,
  onClose,
}: {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 w-full max-w-[340px] bg-bg-alt/98 backdrop-blur-2xl border-l border-white/[0.06] z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/[0.06]">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary via-primary-light to-accent-cyan">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4.5 h-4.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 4h4v16H4V4zM16 4h4v16h-4V4zM4 4l16 16V4h4v16L4 4"
                        fill="white"
                        fillOpacity="0.9"
                      />
                      <circle cx="18" cy="6" r="2.5" fill="#06B6D4" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-semibold text-text">
                    NovaLabs AI
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="w-5 h-5 text-text-secondary"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-0.5">
                  {navigation.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + index * 0.04,
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center justify-between py-3 px-4 rounded-xl text-[15px] font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            isActive
                              ? "text-text bg-white/[0.06]"
                              : "text-text-secondary hover:text-text hover:bg-white/[0.04] active:bg-white/[0.06]"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent-blue" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-4 border-t border-white/[0.06]">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={onClose}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrollPosition(40);
  const { isOpen, toggle, close } = useMobileMenu();

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between h-16 lg:h-[72px]"
            aria-label="Main navigation"
          >
            <Logo />

            <div className="hidden lg:flex items-center gap-0.5">
              {navigation.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                  />
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Book a Demo
              </Button>
            </div>

            <MobileMenuButton isOpen={isOpen} onClick={toggle} />
          </nav>
        </Container>
      </header>

      <MobileMenu isOpen={isOpen} pathname={pathname} onClose={close} />

      <div className="h-16 lg:h-[72px]" aria-hidden="true" />
    </>
  );
}
