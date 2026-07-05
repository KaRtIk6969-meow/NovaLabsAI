"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const messages = [
  { from: "user", text: "How do I reset?", delay: 0.2 },
  { from: "ai", text: "Go to Settings → Account", delay: 1.2 },
  { from: "user", text: "Thanks!", delay: 2.2 },
  { from: "ai", text: "Happy to help!", delay: 3.0 },
];

export function CustomerSupportVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[180px] flex flex-col justify-center gap-2 px-3 py-2">
      {messages.map((msg, i) => {
        const isAI = msg.from === "ai";
        return (
          <motion.div
            key={i}
            className={`flex ${isAI ? "justify-start" : "justify-end"}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: msg.delay, ease }}
          >
            <div
              className={`relative max-w-[80%] px-3 py-1.5 rounded-xl text-[11px] leading-relaxed ${
                isAI
                  ? "bg-white/[0.05] border border-white/[0.08] text-text-secondary rounded-bl-sm"
                  : "bg-primary/[0.15] border border-primary/20 text-text rounded-br-sm"
              }`}
            >
              {msg.text}
              {/* AI sparkle */}
              {isAI && !shouldReduceMotion && (
                <motion.span
                  className="absolute -top-1 -left-1 text-[8px]"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                >
                  ✦
                </motion.span>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Typing indicator */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.3 }}
      >
        <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] rounded-bl-sm">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-text-muted/50"
              animate={!shouldReduceMotion ? { y: [0, -3, 0], opacity: [0.4, 1, 0.4] } : {}}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
