"use client";

import { useState, useMemo } from "react";
import { InputForm } from "./input-form";
import { ResultsSummary } from "./results-summary";
import { ValueChart } from "./value-chart";
import { ProjectionsTable } from "./projections-table";
import { DEFAULT_INPUTS, CalculatorInputs } from "@/lib/calculator-types";
import { calculateResults } from "@/lib/calculator-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ValueCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);

  const results = useMemo(() => calculateResults(inputs), [inputs]);

  return (
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
  );
}
