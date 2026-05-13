export type UseCaseType = "content-optimizer" | "agent-console" | "decisioning-studio";

export interface UseCaseConfig {
  id: UseCaseType;
  name: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

export const USE_CASES: UseCaseConfig[] = [
  {
    id: "content-optimizer",
    name: "Content Optimizer",
    description: "Optimize message content and personalization to drive higher engagement and conversions.",
    icon: "sparkles",
    features: [
      "A/B/n testing at scale",
      "AI-powered content recommendations",
      "Personalization optimization",
      "Message variant performance",
    ],
    color: "chart-2",
  },
  {
    id: "agent-console",
    name: "Agent Console",
    description: "Empower support and sales teams with AI-assisted customer engagement tools.",
    icon: "headphones",
    features: [
      "Real-time customer context",
      "AI-suggested responses",
      "Cross-channel visibility",
      "Agent productivity metrics",
    ],
    color: "chart-3",
  },
  {
    id: "decisioning-studio",
    name: "Decisioning Studio",
    description: "Build intelligent decisioning flows that adapt to customer behavior in real-time.",
    icon: "workflow",
    features: [
      "Dynamic audience targeting",
      "Real-time decisioning",
      "Incremental lift measurement",
      "Multi-variant optimization",
    ],
    color: "primary",
  },
];

export interface InitialData {
  useCase: UseCaseType | null;
  companyName: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  estimatedMAU: string;
  primaryGoal: string;
}

export const DEFAULT_INITIAL_DATA: InitialData = {
  useCase: null,
  companyName: "",
  industry: "",
  contactName: "",
  contactEmail: "",
  estimatedMAU: "",
  primaryGoal: "",
};

export const INDUSTRIES = [
  "Retail & E-commerce",
  "Financial Services",
  "Media & Entertainment",
  "Travel & Hospitality",
  "Technology",
  "Healthcare",
  "Telecommunications",
  "Food & Delivery",
  "Gaming",
  "Other",
];

export const PRIMARY_GOALS = [
  "Increase conversion rates",
  "Improve customer retention",
  "Drive incremental revenue",
  "Reduce customer churn",
  "Optimize marketing efficiency",
  "Personalize customer experience",
];
