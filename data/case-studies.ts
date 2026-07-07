export type CaseStudyData = {
  id: string;
  company: string;
  industry: string;
  icon: string;
  status: "active" | "completed";
  challenge: string;
  solution: string;
  before: { label: string; value: string };
  after: { label: string; value: string };
  metrics: Array<{
    label: string;
    value: number;
    suffix: string;
    icon: string;
    decimals?: number;
    secondaryLabel?: string;
  }>;
  implementationWeeks: number;
  sparkline: number[];
  weeklyOutput: number[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  techStack?: string[];
  architecture?: {
    layers: Array<{ name: string; description: string; icon: string }>;
  };
};

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "healthcare",
    company: "MediCore Health",
    industry: "Healthcare",
    icon: "🏥",
    status: "active",
    challenge: "Manual patient scheduling caused long wait times and staff burnout.",
    solution:
      "NovaLabs AI Scheduling Agent — autonomous booking, triage routing, and calendar optimization.",
    before: { label: "Response Time", value: "16 Hours" },
    after: { label: "Response Time", value: "23 Seconds" },
    metrics: [
      { label: "Cost Reduction", value: 67, suffix: "%", icon: "↓", secondaryLabel: "+12% this quarter" },
      { label: "ROI", value: 412, suffix: "%", icon: "↑", secondaryLabel: "vs. industry avg 180%" },
      { label: "Staff Satisfaction", value: 89, suffix: "%", icon: "↑", secondaryLabel: "+23pts since deploy" },
    ],
    implementationWeeks: 4,
    sparkline: [20, 35, 28, 45, 42, 60, 58, 75, 72, 85, 88, 92],
    weeklyOutput: [35, 48, 42, 60, 55, 72, 68, 82],
    testimonial: {
      quote:
        "NovaLabs AI transformed our patient scheduling overnight. Wait times dropped by 94% and our staff finally has time to focus on what matters — patient care.",
      author: "Dr. Sarah Chen",
      role: "Chief Medical Officer, MediCore Health",
    },
    techStack: ["Python", "TensorFlow", "FHIR API", "Kubernetes", "PostgreSQL", "Redis"],
    architecture: {
      layers: [
        { name: "Data Ingestion", description: "HL7/FHIR patient data streams", icon: "📡" },
        { name: "AI Engine", description: "Triage classification & scheduling optimization", icon: "🧠" },
        { name: "Decision Layer", description: "Automated booking & calendar management", icon: "⚡" },
        { name: "Integration", description: "EHR systems, patient portal, staff dashboard", icon: "🔗" },
      ],
    },
  },
  {
    id: "manufacturing",
    company: "PrecisionWorks",
    industry: "Manufacturing",
    icon: "🏭",
    status: "completed",
    challenge: "Manual quality inspection missed defects, causing costly recalls.",
    solution:
      "AI Vision System — real-time defect detection with automated rejection and reporting.",
    before: { label: "Inspection Accuracy", value: "78%" },
    after: { label: "Inspection Accuracy", value: "99.4%" },
    metrics: [
      { label: "Accuracy Gain", value: 99.4, suffix: "%", icon: "↑", decimals: 1, secondaryLabel: "+21.4% from baseline" },
      { label: "Downtime", value: 54, suffix: "%", icon: "↓", secondaryLabel: "4.2hrs saved daily" },
      { label: "Recall Rate", value: 91, suffix: "%", icon: "↓", secondaryLabel: "Prevented 12 recalls" },
    ],
    implementationWeeks: 6,
    sparkline: [15, 22, 30, 28, 45, 52, 60, 58, 72, 80, 88, 95],
    weeklyOutput: [28, 38, 35, 50, 45, 65, 58, 75],
    testimonial: {
      quote:
        "The AI Vision System catches defects our best inspectors missed. We've prevented 12 potential recalls in the first year alone.",
      author: "Marcus Rodriguez",
      role: "VP of Operations, PrecisionWorks",
    },
    techStack: ["PyTorch", "OpenCV", "NVIDIA CUDA", "AWS IoT", "InfluxDB", "Grafana"],
    architecture: {
      layers: [
        { name: "Camera Array", description: "High-speed industrial cameras", icon: "📷" },
        { name: "Vision AI", description: "Real-time defect classification", icon: "👁️" },
        { name: "Edge Processing", description: "On-line inference < 50ms", icon: "⚡" },
        { name: "Analytics", description: "Trend analysis & reporting dashboard", icon: "📊" },
      ],
    },
  },
  {
    id: "finance",
    company: "Vertex Capital",
    industry: "Finance",
    icon: "📊",
    status: "active",
    challenge: "Loan approvals took 3 days. Fraud detection was reactive.",
    solution:
      "AI Decision Engine — instant risk scoring, automated approvals, and real-time fraud monitoring.",
    before: { label: "Approval Time", value: "3 Days" },
    after: { label: "Approval Time", value: "3 Minutes" },
    metrics: [
      { label: "Speed Improvement", value: 1440, suffix: "x", icon: "↑", secondaryLabel: "3 days → 3 minutes" },
      { label: "Fraud Detection", value: 82, suffix: "%", icon: "↑", secondaryLabel: "+34% accuracy gain" },
      { label: "False Positives", value: 63, suffix: "%", icon: "↓", secondaryLabel: "67% fewer flags" },
    ],
    implementationWeeks: 8,
    sparkline: [10, 18, 25, 35, 42, 55, 60, 68, 75, 82, 90, 96],
    weeklyOutput: [22, 32, 28, 45, 40, 58, 52, 68],
    testimonial: {
      quote:
        "Loan approvals that used to take 3 days now happen in 3 minutes. Our fraud detection accuracy improved by 34% in the first quarter.",
      author: "Elena Volkov",
      role: "Chief Risk Officer, Vertex Capital",
    },
    techStack: ["Python", "XGBoost", "Apache Kafka", "Redis", "PostgreSQL", "Docker"],
    architecture: {
      layers: [
        { name: "Data Pipeline", description: "Real-time transaction feeds", icon: "📡" },
        { name: "Risk Engine", description: "ML scoring & fraud detection", icon: "🧠" },
        { name: "Decision API", description: "Instant approval/rejection logic", icon: "⚡" },
        { name: "Compliance", description: "Audit trail & regulatory reporting", icon: "🛡️" },
      ],
    },
  },
  {
    id: "retail",
    company: "Lumina Retail",
    industry: "Retail",
    icon: "🛒",
    status: "completed",
    challenge: "Inventory forecasting was inaccurate, leading to stock waste and shortages.",
    solution:
      "Demand Prediction AI — predictive analytics with automated reorder and waste reduction.",
    before: { label: "Forecast Accuracy", value: "62%" },
    after: { label: "Forecast Accuracy", value: "94%" },
    metrics: [
      { label: "Stock Waste", value: 71, suffix: "%", icon: "↓", secondaryLabel: "$2.1M saved annually" },
      { label: "Revenue Uplift", value: 34, suffix: "%", icon: "↑", secondaryLabel: "+$8.4M quarterly" },
      { label: "Stockout Rate", value: 58, suffix: "%", icon: "↓", secondaryLabel: "58% fewer shortages" },
    ],
    implementationWeeks: 5,
    sparkline: [18, 25, 32, 40, 48, 55, 62, 70, 78, 85, 90, 94],
    weeklyOutput: [30, 42, 38, 55, 48, 68, 62, 78],
    testimonial: {
      quote:
        "We went from guessing demand to predicting it with 94% accuracy. Stock waste dropped 71% and revenue is up 34%.",
      author: "James Okafor",
      role: "Director of Supply Chain, Lumina Retail",
    },
    techStack: ["Python", "Prophet", "Apache Airflow", "Snowflake", "dbt", "Looker"],
    architecture: {
      layers: [
        { name: "Sales Data", description: "POS, e-commerce, weather feeds", icon: "📡" },
        { name: "Demand Model", description: "Time-series forecasting ensemble", icon: "🧠" },
        { name: "Optimization", description: "Automated reorder & allocation", icon: "⚡" },
        { name: "Dashboard", description: "Real-time inventory visibility", icon: "📊" },
      ],
    },
  },
  {
    id: "logistics",
    company: "SwiftRoute",
    industry: "Logistics",
    icon: "🚚",
    status: "active",
    challenge: "Fleet optimization was manual, leading to high fuel costs and late deliveries.",
    solution:
      "Fleet Intelligence AI — route optimization, predictive maintenance, and real-time tracking.",
    before: { label: "On-Time Delivery", value: "71%" },
    after: { label: "On-Time Delivery", value: "97%" },
    metrics: [
      { label: "Fuel Cost", value: 34, suffix: "%", icon: "↓", secondaryLabel: "$1.8M saved per year" },
      { label: "Delivery Time", value: 41, suffix: "%", icon: "↓", secondaryLabel: "2.3hrs faster avg" },
      { label: "Fleet Utilization", value: 28, suffix: "%", icon: "↑", secondaryLabel: "+28% capacity used" },
    ],
    implementationWeeks: 3,
    sparkline: [22, 30, 38, 45, 52, 60, 65, 72, 78, 85, 92, 97],
    weeklyOutput: [40, 52, 48, 65, 58, 78, 72, 88],
    testimonial: {
      quote:
        "On-time deliveries jumped from 71% to 97%. The AI route optimization pays for itself in fuel savings alone.",
      author: "Aisha Patel",
      role: "Fleet Director, SwiftRoute Logistics",
    },
    techStack: ["Go", "Google OR-Tools", "MQTT", "TimescaleDB", "Kubernetes", "Grafana"],
    architecture: {
      layers: [
        { name: "Fleet Telematics", description: "GPS, fuel, engine diagnostics", icon: "📡" },
        { name: "Route AI", description: "Dynamic optimization engine", icon: "🧠" },
        { name: "Dispatch", description: "Automated assignment & rerouting", icon: "⚡" },
        { name: "Analytics", description: "Performance & cost dashboards", icon: "📊" },
      ],
    },
  },
];

export const INDUSTRIES = ["All", "Healthcare", "Manufacturing", "Finance", "Retail", "Logistics"] as const;

export type IndustryFilter = (typeof INDUSTRIES)[number];
