export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes loading-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes loading-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="animate-pulse-soft"
            >
              <rect width="32" height="32" rx="8" fill="#0070f3" />
              <path
                d="M10 22V10h4l4 6 4-6h4v12h-3.5v-8l-4.5 6.5L13.5 14v8H10z"
                fill="#ffffff"
              />
            </svg>
            <span
              className="text-xl font-semibold tracking-tight text-text"
              style={{ animation: "loading-pulse 2.5s ease-in-out infinite" }}
            >
              NovaLabs AI
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-1.5 w-1.5 rounded-full bg-link"
                style={{
                  animation: `loading-dot 1.4s ease-in-out ${i * 0.16}s infinite`,
                }}
              />
            ))}
          </div>

          <div className="relative h-0.5 w-48 overflow-hidden rounded-full bg-canvas-raised">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #0070f3, #7928ca, transparent)",
                animation: "loading-bar 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
