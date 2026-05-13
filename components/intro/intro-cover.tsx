"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UseCaseType,
  USE_CASES,
  InitialData,
  DEFAULT_INITIAL_DATA,
} from "@/lib/use-case-types";
import { Sparkles, Headphones, Workflow, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroCoverProps {
  onContinue: (data: InitialData) => void;
}

const iconMap = {
  sparkles: Sparkles,
  headphones: Headphones,
  workflow: Workflow,
};

export function IntroCover({ onContinue }: IntroCoverProps) {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseType | null>(null);

  const handleUseCaseSelect = (useCase: UseCaseType) => {
    setSelectedUseCase(useCase);
  };

  const handleContinue = () => {
    if (selectedUseCase) {
      onContinue({
        ...DEFAULT_INITIAL_DATA,
        useCase: selectedUseCase,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Braze Value Calculator
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover the potential value Braze can deliver for your business. Select your use case to get started.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Use Case Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground text-center">
              Select Your Use Case
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {USE_CASES.map((useCase) => {
                const Icon = iconMap[useCase.icon as keyof typeof iconMap];
                const isSelected = selectedUseCase === useCase.id;

                return (
                  <Card
                    key={useCase.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md relative overflow-hidden",
                      isSelected
                        ? "border-2 border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleUseCaseSelect(useCase.id)}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-lg flex items-center justify-center mb-3",
                          useCase.id === "content-optimizer" && "bg-chart-2/20",
                          useCase.id === "agent-console" && "bg-chart-3/20",
                          useCase.id === "decisioning-studio" && "bg-primary/20"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6",
                            useCase.id === "content-optimizer" && "text-chart-2",
                            useCase.id === "agent-console" && "text-chart-3",
                            useCase.id === "decisioning-studio" && "text-primary"
                          )}
                        />
                      </div>
                      <CardTitle className="text-lg">{useCase.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {useCase.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {useCase.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedUseCase}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Braze Value Calculator - Powered by Braze
          </p>
        </div>
      </footer>
    </div>
  );
}
