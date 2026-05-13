"use client";

import { useState, useMemo } from "react";
import { InputForm } from "./input-form";
import { ResultsSummary } from "./results-summary";
import { ValueChart } from "./value-chart";
import { ProjectionsTable } from "./projections-table";
import { DEFAULT_INPUTS, CalculatorInputs } from "@/lib/calculator-types";
import { calculateResults } from "@/lib/calculator-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InitialData } from "@/lib/use-case-types";
import { ArrowLeft, Workflow } from "lucide-react";

interface DecisioningStudioCalculatorProps {
  initialData: InitialData;
  onBack: () => void;
}

export function DecisioningStudioCalculator({ initialData, onBack }: DecisioningStudioCalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    useCaseName: initialData.companyName ? `${initialData.companyName} - Decisioning Studio` : "Decisioning Studio Use Case",
  });

  const results = useMemo(() => calculateResults(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Workflow className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Decisioning Studio Calculator
                  </h1>
                  {initialData.companyName && (
                    <p className="text-sm text-muted-foreground">
                      {initialData.companyName} {initialData.industry && `| ${initialData.industry}`}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Calculate the incremental value of Braze Decisioning Studio for your business
              </p>
            </div>
            <Button variant="outline" onClick={onBack} className="gap-2 shrink-0">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Instructions Banner */}
        <div className="mb-8 rounded-lg border-2 border-accent bg-accent/10 p-4">
          <p className="text-sm text-accent-foreground">
            <span className="font-semibold">Instructions:</span> Fill in the key inputs below to calculate the projected value. 
            Use Notes or Comments to explain assumptions. Reach out to your ASC with questions.
          </p>
        </div>

        <div className="space-y-8">
          {/* Input Form */}
          <InputForm inputs={inputs} onChange={setInputs} />

          {/* Results Summary */}
          <ResultsSummary results={results} inputs={inputs} />

          {/* Charts and Table */}
          <Tabs defaultValue="charts" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="table">Data Table</TabsTrigger>
            </TabsList>
            <TabsContent value="charts" className="mt-6">
              <ValueChart results={results} inputs={inputs} />
            </TabsContent>
            <TabsContent value="table" className="mt-6">
              <ProjectionsTable results={results} inputs={inputs} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Braze Value Calculator - Decisioning Studio
          </p>
        </div>
      </footer>
    </div>
  );
}
