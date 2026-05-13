"use client";

import { useState } from "react";
import { IntroCover } from "@/components/intro/intro-cover";
import { DecisioningStudioCalculator } from "@/components/calculator/decisioning-studio-calculator";
import { ContentOptimizerCalculator } from "@/components/calculator/content-optimizer-calculator";
import { AgentConsoleCalculator } from "@/components/calculator/agent-console-calculator";
import { InitialData } from "@/lib/use-case-types";

export default function Home() {
  const [initialData, setInitialData] = useState<InitialData | null>(null);

  const handleContinue = (data: InitialData) => {
    setInitialData(data);
  };

  const handleBack = () => {
    setInitialData(null);
  };

  // Show intro cover if no use case selected
  if (!initialData) {
    return <IntroCover onContinue={handleContinue} />;
  }

  // Render the appropriate calculator based on use case
  switch (initialData.useCase) {
    case "content-optimizer":
      return <ContentOptimizerCalculator initialData={initialData} onBack={handleBack} />;
    case "agent-console":
      return <AgentConsoleCalculator initialData={initialData} onBack={handleBack} />;
    case "decisioning-studio":
    default:
      return <DecisioningStudioCalculator initialData={initialData} onBack={handleBack} />;
  }
}
