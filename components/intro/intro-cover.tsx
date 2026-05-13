"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UseCaseType,
  USE_CASES,
  InitialData,
  DEFAULT_INITIAL_DATA,
  INDUSTRIES,
  PRIMARY_GOALS,
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
  const [data, setData] = useState<InitialData>(DEFAULT_INITIAL_DATA);
  const [step, setStep] = useState<"useCase" | "details">("useCase");

  const handleUseCaseSelect = (useCase: UseCaseType) => {
    setData({ ...data, useCase });
  };

  const handleChange = (field: keyof InitialData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleContinueToDetails = () => {
    if (data.useCase) {
      setStep("details");
    }
  };

  const handleSubmit = () => {
    onContinue(data);
  };

  const selectedUseCase = USE_CASES.find((uc) => uc.id === data.useCase);

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
        {step === "useCase" ? (
          <div className="space-y-8">
            {/* Use Case Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground text-center">
                Select Your Use Case
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {USE_CASES.map((useCase) => {
                  const Icon = iconMap[useCase.icon as keyof typeof iconMap];
                  const isSelected = data.useCase === useCase.id;

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
                onClick={handleContinueToDetails}
                disabled={!data.useCase}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Selected Use Case Badge */}
            {selectedUseCase && (
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("useCase")}
                  className="text-muted-foreground"
                >
                  Change use case
                </Button>
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                    selectedUseCase.id === "content-optimizer" &&
                      "bg-chart-2/20 text-chart-2",
                    selectedUseCase.id === "agent-console" &&
                      "bg-chart-3/20 text-chart-3",
                    selectedUseCase.id === "decisioning-studio" &&
                      "bg-primary/20 text-primary"
                  )}
                >
                  {(() => {
                    const Icon = iconMap[selectedUseCase.icon as keyof typeof iconMap];
                    return <Icon className="h-4 w-4" />;
                  })()}
                  {selectedUseCase.name}
                </div>
              </div>
            )}

            {/* Initial Details Form */}
            <Card className="border-2 border-border">
              <CardHeader className="bg-primary pb-4">
                <CardTitle className="text-lg font-semibold text-primary-foreground">
                  Tell Us About Your Business
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  This information helps us tailor the value calculation to your specific needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {/* Company Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={data.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium">
                        Industry
                      </Label>
                      <Select
                        value={data.industry}
                        onValueChange={(value) => handleChange("industry", value)}
                      >
                        <SelectTrigger id="industry" className="bg-card">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-sm font-medium">
                        Contact Name
                      </Label>
                      <Input
                        id="contactName"
                        placeholder="Your name"
                        value={data.contactName}
                        onChange={(e) => handleChange("contactName", e.target.value)}
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-sm font-medium">
                        Contact Email
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={data.contactEmail}
                        onChange={(e) => handleChange("contactEmail", e.target.value)}
                        className="bg-card"
                      />
                    </div>
                  </div>

                  {/* Business Metrics */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedMAU" className="text-sm font-medium">
                        Estimated Monthly Active Users
                      </Label>
                      <Select
                        value={data.estimatedMAU}
                        onValueChange={(value) => handleChange("estimatedMAU", value)}
                      >
                        <SelectTrigger id="estimatedMAU" className="bg-card">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<100k">Less than 100K</SelectItem>
                          <SelectItem value="100k-500k">100K - 500K</SelectItem>
                          <SelectItem value="500k-1m">500K - 1M</SelectItem>
                          <SelectItem value="1m-5m">1M - 5M</SelectItem>
                          <SelectItem value="5m-10m">5M - 10M</SelectItem>
                          <SelectItem value=">10m">More than 10M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryGoal" className="text-sm font-medium">
                        Primary Goal
                      </Label>
                      <Select
                        value={data.primaryGoal}
                        onValueChange={(value) => handleChange("primaryGoal", value)}
                      >
                        <SelectTrigger id="primaryGoal" className="bg-card">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRIMARY_GOALS.map((goal) => (
                            <SelectItem key={goal} value={goal}>
                              {goal}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setStep("useCase")}>
                Back
              </Button>
              <Button size="lg" onClick={handleSubmit} className="gap-2">
                Start Calculator
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
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
