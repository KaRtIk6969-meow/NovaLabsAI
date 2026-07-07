"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerContainer, reveal, easing } from "@/design-system";
const blurFadeUp = reveal.blurFadeUp;
const ease = easing.default;

const SERVICE_OPTIONS = [
  "AI Consultation",
  "Workflow Automation",
  "Enterprise AI Deployment",
  "Technical Support",
  "Custom AI Development",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k - $500k",
  "$500k+",
];

const COMPANY_SIZE_OPTIONS = [
  "1-10",
  "11-50",
  "51-200",
  "201-1000",
  "1000+",
];

const stagger = staggerContainer(0.05, 0.08);
const fadeUp = blurFadeUp;

function FloatingInput({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;

  return (
    <motion.div variants={fadeUp} className="relative group">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm text-text text-sm outline-none transition-all duration-300 focus:border-accent-blue/50 focus:ring-0"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-2 text-[11px] font-medium text-accent-blue"
            : "top-1/2 -translate-y-1/2 text-sm text-text-muted group-focus-within:text-accent-blue"
        }`}
      >
        {label}
        {required && <span className="text-accent-cyan ml-0.5">*</span>}
      </label>
      {/* Animated focus border */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-px bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
        initial={{ width: 0, x: "-50%" }}
        animate={focused ? { width: "100%", x: "-50%" } : { width: 0, x: "-50%" }}
        transition={{ duration: 0.3, ease }}
      />
      {/* Glow on focus */}
      <motion.div
        className="absolute -inset-px rounded-xl pointer-events-none"
        animate={focused ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle at 50% 100%, var(--svg-link-dim), transparent 70%)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function FloatingTextarea({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;

  return (
    <motion.div variants={fadeUp} className="relative group">
      <textarea
        name={name}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm text-text text-sm outline-none transition-all duration-300 focus:border-accent-blue/50 focus:ring-0 resize-none"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-2 text-[11px] font-medium text-accent-blue"
            : "top-6 text-sm text-text-muted group-focus-within:text-accent-blue"
        }`}
      >
        {label}
        {required && <span className="text-accent-cyan ml-0.5">*</span>}
      </label>
      <motion.div
        className="absolute bottom-0 left-1/2 h-px bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
        initial={{ width: 0, x: "-50%" }}
        animate={focused ? { width: "100%", x: "-50%" } : { width: 0, x: "-50%" }}
        transition={{ duration: 0.3, ease }}
      />
      <motion.div
        className="absolute -inset-px rounded-xl pointer-events-none"
        animate={focused ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle at 50% 100%, var(--svg-link-dim), transparent 70%)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function FloatingSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;

  return (
    <motion.div variants={fadeUp} className="relative group">
      <select
        name={name}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm text-text text-sm outline-none transition-all duration-300 focus:border-accent-blue/50 focus:ring-0 appearance-none cursor-pointer"
      >
        <option value="" disabled></option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-canvas text-text">
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-2 text-[11px] font-medium text-accent-blue"
            : "top-1/2 -translate-y-1/2 text-sm text-text-muted group-focus-within:text-accent-blue"
        }`}
      >
        {label}
        {required && <span className="text-accent-cyan ml-0.5">*</span>}
      </label>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <motion.div
        className="absolute bottom-0 left-1/2 h-px bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
        initial={{ width: 0, x: "-50%" }}
        animate={focused ? { width: "100%", x: "-50%" } : { width: 0, x: "-50%" }}
        transition={{ duration: 0.3, ease }}
      />
      <motion.div
        className="absolute -inset-px rounded-xl pointer-events-none"
        animate={focused ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle at 50% 100%, var(--svg-link-dim), transparent 70%)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function SubmitButton({ isSubmitting, isSubmitted }: { isSubmitting: boolean; isSubmitted: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    },
    []
  );

  return (
    <motion.button
      ref={buttonRef}
      type="submit"
      disabled={isSubmitting || isSubmitted}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group/btn relative w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium text-[15px] bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-blue/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "glass-sweep 3s linear infinite",
        }}
        aria-hidden="true"
      />
      {/* Gradient hover */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </motion.span>
          ) : isSubmitted ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sent!
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              Send Message
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true">
                <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

export function ContactForm() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 1500);
    },
    []
  );

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="contact-form-heading"
    >
      <Container>
        <motion.div
          variants={stagger}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2
              id="contact-form-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
            >
              Send Us a{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Message
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 overflow-hidden"
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                padding: 1,
                background: "linear-gradient(135deg, var(--svg-link), var(--svg-violet), var(--svg-cyan), var(--svg-link))",
                backgroundSize: "300% 300%",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />

            {/* Subtle gradient glow */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] opacity-[0.02]"
                style={{ background: "var(--svg-cyan)" }}
              />
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 text-center py-12"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-cyan/10 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8 text-accent-cyan"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                  </motion.svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-text mb-2">Message Sent!</h3>
                <p className="text-sm text-text-secondary">
                  Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingInput label="Full Name" name="name" required />
                  <FloatingInput label="Company" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingInput label="Work Email" name="email" type="email" required />
                  <FloatingInput label="Phone" name="phone" type="tel" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingSelect
                    label="Company Size"
                    name="companySize"
                    options={COMPANY_SIZE_OPTIONS}
                  />
                  <FloatingSelect
                    label="Service Interested In"
                    name="service"
                    options={SERVICE_OPTIONS}
                  />
                </div>
                <FloatingSelect
                  label="Budget Range"
                  name="budget"
                  options={BUDGET_OPTIONS}
                />
                <FloatingTextarea label="Tell us about your project" name="message" required />

                <motion.div variants={fadeUp} className="pt-2">
                  <SubmitButton isSubmitting={submitting} isSubmitted={submitted} />
                </motion.div>

                <p className="text-center text-xs text-text-muted mt-4">
                  By submitting, you agree to our privacy policy. We&apos;ll never share your data.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
