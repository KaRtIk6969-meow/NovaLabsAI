export type BlogCategory =
  | "All"
  | "AI Agents"
  | "Automation"
  | "Enterprise AI"
  | "LLMs"
  | "RAG"
  | "Tutorials"
  | "Case Studies"
  | "News";

export type BlogArticle = {
  id: string;
  title: string;
  summary: string;
  category: BlogCategory;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  slug: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  coverGradient: string;
};

export const CATEGORIES: BlogCategory[] = [
  "All",
  "AI Agents",
  "Automation",
  "Enterprise AI",
  "LLMs",
  "RAG",
  "Tutorials",
  "Case Studies",
  "News",
];

export const POPULAR_TOPICS = [
  "GPT-4",
  "LangChain",
  "Vector Databases",
  "Fine-Tuning",
  "Prompt Engineering",
  "RAG Pipelines",
  "AI Agents",
  "Workflow Automation",
  "Enterprise Search",
  "Model Deployment",
  "Embeddings",
  "Semantic Search",
  "Multi-Modal AI",
  "AI Security",
  "MLOps",
  "Data Pipelines",
];

export const ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "Building Production-Ready AI Agents That Actually Work",
    summary:
      "A deep dive into the architecture patterns, failure modes, and hard-won lessons from deploying autonomous AI agents at enterprise scale.",
    category: "AI Agents",
    readTime: "12 min",
    author: "Sarah Chen",
    authorRole: "Head of AI Engineering",
    date: "Jan 15, 2026",
    slug: "production-ready-ai-agents",
    tags: ["AI Agents", "Architecture", "Enterprise"],
    featured: true,
    trending: true,
    coverGradient: "from-accent-blue via-accent-violet to-accent-cyan",
  },
  {
    id: "2",
    title: "RAG vs Fine-Tuning: When to Use Each Approach",
    summary:
      "An honest comparison of Retrieval-Augmented Generation and fine-tuning for enterprise use cases, with benchmarks and decision frameworks.",
    category: "RAG",
    readTime: "10 min",
    author: "Marcus Rodriguez",
    authorRole: "Principal AI Architect",
    date: "Jan 12, 2026",
    slug: "rag-vs-fine-tuning",
    tags: ["RAG", "Fine-Tuning", "LLMs"],
    trending: true,
    coverGradient: "from-accent-violet via-accent-blue to-accent-cyan",
  },
  {
    id: "3",
    title: "The Enterprise Guide to AI Workflow Automation",
    summary:
      "How Fortune 500 companies are replacing manual processes with intelligent automation that delivers measurable ROI within 90 days.",
    category: "Automation",
    readTime: "8 min",
    author: "Elena Volkov",
    authorRole: "VP of Solutions",
    date: "Jan 10, 2026",
    slug: "enterprise-ai-workflow-automation",
    tags: ["Automation", "Enterprise", "ROI"],
    trending: true,
    coverGradient: "from-accent-cyan via-accent-blue to-accent-violet",
  },
  {
    id: "4",
    title: "Implementing Enterprise Search with Vector Databases",
    summary:
      "Step-by-step guide to building a semantic search system that understands context, not just keywords, using Pinecone and OpenAI embeddings.",
    category: "Tutorials",
    readTime: "15 min",
    author: "James Park",
    authorRole: "Senior AI Engineer",
    date: "Jan 8, 2026",
    slug: "enterprise-search-vector-databases",
    tags: ["Vector Databases", "Search", "Embeddings"],
    coverGradient: "from-accent-blue via-accent-cyan to-accent-violet",
  },
  {
    id: "5",
    title: "How NovaLabs Reduced Processing Time by 73% for MedCorp",
    summary:
      "A case study on deploying an AI-powered document processing pipeline that transformed healthcare operations at scale.",
    category: "Case Studies",
    readTime: "7 min",
    author: "Sarah Chen",
    authorRole: "Head of AI Engineering",
    date: "Jan 5, 2026",
    slug: "medcorp-case-study",
    tags: ["Case Studies", "Healthcare", "Document AI"],
    coverGradient: "from-accent-violet via-accent-cyan to-accent-blue",
  },
  {
    id: "6",
    title: "Understanding LLM Context Windows and Token Limits",
    summary:
      "A practical guide to managing context windows, token budgets, and the tradeoffs between different LLM providers for production applications.",
    category: "LLMs",
    readTime: "9 min",
    author: "Marcus Rodriguez",
    authorRole: "Principal AI Architect",
    date: "Jan 3, 2026",
    slug: "llm-context-windows-token-limits",
    tags: ["LLMs", "Tokens", "Architecture"],
    coverGradient: "from-accent-cyan via-accent-violet to-accent-blue",
  },
  {
    id: "7",
    title: "Multi-Agent Systems: Coordinating AI at Scale",
    summary:
      "Architecture patterns for building systems where multiple AI agents collaborate, negotiate, and solve complex problems together.",
    category: "AI Agents",
    readTime: "14 min",
    author: "Elena Volkov",
    authorRole: "VP of Solutions",
    date: "Dec 28, 2025",
    slug: "multi-agent-systems",
    tags: ["AI Agents", "Multi-Agent", "Architecture"],
    coverGradient: "from-accent-blue via-accent-violet to-accent-cyan",
  },
  {
    id: "8",
    title: "Prompt Engineering for Enterprise Applications",
    summary:
      "Beyond basics: advanced prompt engineering techniques for reliable, consistent, and production-grade AI outputs in business contexts.",
    category: "Tutorials",
    readTime: "11 min",
    author: "James Park",
    authorRole: "Senior AI Engineer",
    date: "Dec 25, 2025",
    slug: "prompt-engineering-enterprise",
    tags: ["Prompt Engineering", "LLMs", "Tutorials"],
    coverGradient: "from-accent-violet via-accent-blue to-accent-cyan",
  },
  {
    id: "9",
    title: "NovaLabs Raises $50M Series B to Expand Enterprise AI Platform",
    summary:
      "New funding will accelerate development of autonomous AI agents and expand our enterprise integration ecosystem.",
    category: "News",
    readTime: "3 min",
    author: "NovaLabs Team",
    authorRole: "Company News",
    date: "Dec 20, 2025",
    slug: "series-b-funding",
    tags: ["News", "Funding", "Company"],
    coverGradient: "from-accent-cyan via-accent-blue to-accent-violet",
  },
  {
    id: "10",
    title: "Building a RAG Pipeline with pgvector and Next.js",
    summary:
      "Full-stack tutorial: build a retrieval-augmented generation system with PostgreSQL vector search, OpenAI, and a modern web interface.",
    category: "Tutorials",
    readTime: "18 min",
    author: "James Park",
    authorRole: "Senior AI Engineer",
    date: "Dec 18, 2025",
    slug: "rag-pipeline-pgvector-nextjs",
    tags: ["RAG", "Tutorials", "Vector Databases"],
    coverGradient: "from-accent-blue via-accent-cyan to-accent-violet",
  },
  {
    id: "11",
    title: "AI-Powered Document Processing for Financial Services",
    summary:
      "How NovaLabs deployed intelligent document extraction and compliance checking for a top-10 bank, reducing manual review by 85%.",
    category: "Case Studies",
    readTime: "6 min",
    author: "Elena Volkov",
    authorRole: "VP of Solutions",
    date: "Dec 15, 2025",
    slug: "financial-services-document-ai",
    tags: ["Case Studies", "Finance", "Document AI"],
    coverGradient: "from-accent-violet via-accent-cyan to-accent-blue",
  },
  {
    id: "12",
    title: "The State of Enterprise AI in 2026",
    summary:
      "Our annual report on AI adoption trends, technology shifts, and the emerging patterns that will define enterprise intelligence next year.",
    category: "Enterprise AI",
    readTime: "13 min",
    author: "Sarah Chen",
    authorRole: "Head of AI Engineering",
    date: "Dec 12, 2025",
    slug: "state-of-enterprise-ai-2026",
    tags: ["Enterprise AI", "Trends", "Report"],
    trending: true,
    coverGradient: "from-accent-blue via-accent-violet to-accent-cyan",
  },
  {
    id: "13",
    title: "Fine-Tuning Llama 3 for Domain-Specific Tasks",
    summary:
      "A complete walkthrough of fine-tuning open-source LLMs for specialized enterprise applications, from data preparation to deployment.",
    category: "LLMs",
    readTime: "16 min",
    author: "Marcus Rodriguez",
    authorRole: "Principal AI Architect",
    date: "Dec 10, 2025",
    slug: "fine-tuning-llama-3",
    tags: ["LLMs", "Fine-Tuning", "Open Source"],
    coverGradient: "from-accent-cyan via-accent-violet to-accent-blue",
  },
  {
    id: "14",
    title: "Automating Customer Support with Intelligent Routing",
    summary:
      "Build an AI-powered ticket classification and routing system that reduced response times by 60% for a global SaaS company.",
    category: "Automation",
    readTime: "9 min",
    author: "Elena Volkov",
    authorRole: "VP of Solutions",
    date: "Dec 8, 2025",
    slug: "customer-support-automation",
    tags: ["Automation", "Customer Support", "NLP"],
    coverGradient: "from-accent-blue via-accent-cyan to-accent-violet",
  },
  {
    id: "15",
    title: "Implementing AI Safety Guardrails in Production",
    summary:
      "Practical strategies for content filtering, hallucination detection, and responsible AI deployment in enterprise environments.",
    category: "Enterprise AI",
    readTime: "10 min",
    author: "Sarah Chen",
    authorRole: "Head of AI Engineering",
    date: "Dec 5, 2025",
    slug: "ai-safety-guardrails",
    tags: ["AI Safety", "Enterprise", "Responsible AI"],
    coverGradient: "from-accent-violet via-accent-blue to-accent-cyan",
  },
  {
    id: "16",
    title: "Real-Time Data Pipelines for AI-Driven Decisions",
    summary:
      "Architecting streaming data infrastructure that feeds fresh context to AI systems, enabling real-time intelligent automation.",
    category: "Enterprise AI",
    readTime: "11 min",
    author: "Marcus Rodriguez",
    authorRole: "Principal AI Architect",
    date: "Dec 2, 2025",
    slug: "real-time-data-pipelines",
    tags: ["Data Pipelines", "Streaming", "Architecture"],
    coverGradient: "from-accent-cyan via-accent-blue to-accent-violet",
  },
];

export const FEATURED_ARTICLE = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
export const TRENDING_ARTICLES = ARTICLES.filter((a) => a.trending);
