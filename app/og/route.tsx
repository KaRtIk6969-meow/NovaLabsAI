import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #0c0a1a 50%, #09090b 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Aurora glow */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Cyan glow */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "15%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(80,227,194,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #50e3c2)",
            marginBottom: "32px",
            boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="48" height="48">
            <path
              d="M4 4h4v16H4V4zM16 4h4v16h-4V4zM4 4l16 16V4h4v16L4 4"
              fill="white"
              fillOpacity="0.9"
            />
            <circle cx="18" cy="6" r="2.5" fill="#50e3c2" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          NovaLabs{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #3b82f6, #50e3c2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#a1a1aa",
            fontWeight: 500,
          }}
        >
          Enterprise AI Automation
        </div>

        {/* URL */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            color: "#52525b",
          }}
        >
          novalabs.ai
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
