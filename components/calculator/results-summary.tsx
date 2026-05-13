"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorResults, CalculatorInputs } from "@/lib/calculator-types";
import { formatCurrency, formatPercent } from "@/lib/calculator-utils";

interface ResultsSummaryProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

export function ResultsSummary({ results, inputs }: ResultsSummaryProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Annualized Run Rate */}
      <Card className="border-2 border-border">
        <CardHeader className="bg-info pb-4">
          <CardTitle className="text-lg font-semibold text-info-foreground">
            Annualized Run-Rate Value over BAU
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low</p>
                <p className="text-xs text-muted-foreground">
                  ({formatPercent(results.liftBenchmarks.low)} lift)
                </p>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(results.annualizedRunRate.low, inputs.currency, true)}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-success/20 p-4 ring-2 ring-success">
              <div>
                <p className="text-sm font-medium text-foreground">Target</p>
                <p className="text-xs text-muted-foreground">
                  ({formatPercent(results.liftBenchmarks.target)} lift)
                </p>
              </div>
              <p className="text-3xl font-bold text-success">
                {formatCurrency(results.annualizedRunRate.target, inputs.currency, true)}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High</p>
                <p className="text-xs text-muted-foreground">
                  ({formatPercent(results.liftBenchmarks.high)} lift)
                </p>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(results.annualizedRunRate.high, inputs.currency, true)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lift Benchmarks */}
      <Card className="border-2 border-border">
        <CardHeader className="bg-info pb-4">
          <CardTitle className="text-lg font-semibold text-info-foreground">
            Lift Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm text-muted-foreground">Lift Benchmark (Low)</span>
              <span className="font-mono text-lg font-semibold">
                {formatPercent(results.liftBenchmarks.low)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm text-muted-foreground">Lift Benchmark (Target)</span>
              <span className="font-mono text-lg font-semibold text-success">
                {formatPercent(results.liftBenchmarks.target)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm text-muted-foreground">Lift Benchmark (High)</span>
              <span className="font-mono text-lg font-semibold">
                {formatPercent(results.liftBenchmarks.high)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <h4 className="mb-3 font-medium">Value Per Customer</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holdout</span>
                <span className="font-mono">
                  {formatCurrency(results.valuePerCustomer.holdout, inputs.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BAU (with lift)</span>
                <span className="font-mono">
                  {formatCurrency(results.valuePerCustomer.bau, inputs.currency)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
