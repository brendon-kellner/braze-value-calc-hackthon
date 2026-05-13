"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalculatorResults, CalculatorInputs } from "@/lib/calculator-types";
import { formatCurrency, formatNumber } from "@/lib/calculator-utils";

interface ProjectionsTableProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

export function ProjectionsTable({ results, inputs }: ProjectionsTableProps) {
  // Show first 12 months
  const projections = results.monthlyProjections.slice(0, 12);

  return (
    <Card className="border-2 border-border">
      <CardHeader className="bg-accent pb-4">
        <CardTitle className="text-lg font-semibold text-accent-foreground">
          Monthly Projections (Run-Rate Lift Calculations)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Treatment Group</TableHead>
                  <TableHead className="font-semibold">Metric</TableHead>
                  {projections.map((p) => (
                    <TableHead key={p.month} className="text-right font-semibold">
                      {p.month}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Business As Usual Section */}
                <TableRow className="bg-info/10">
                  <TableCell
                    rowSpan={5}
                    className="font-medium bg-info/20 border-r"
                  >
                    Business As Usual
                  </TableCell>
                  <TableCell>Holdout Audience</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatNumber(p.holdoutAudience)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-info/10">
                  <TableCell>Holdout Value/Customer</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatCurrency(p.holdoutValuePerCustomer, inputs.currency)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-info/10">
                  <TableCell>Total Holdout Value</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatCurrency(p.totalHoldoutValue, inputs.currency, true)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-info/10">
                  <TableCell>BAU Audience</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatNumber(p.bauAudience)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-info/10 border-b-2">
                  <TableCell className="font-medium">Total Value</TableCell>
                  {projections.map((p) => (
                    <TableCell
                      key={p.month}
                      className="text-right font-mono text-sm font-semibold text-primary"
                    >
                      {formatCurrency(p.totalValue, inputs.currency, true)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* With Target Lift Section */}
                <TableRow className="bg-success/10">
                  <TableCell
                    rowSpan={6}
                    className="font-medium bg-success/20 border-r"
                  >
                    With Target Lift
                  </TableCell>
                  <TableCell>Holdout Audience</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatNumber(p.withTargetLift.holdoutAudience)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-success/10">
                  <TableCell>BAU Audience</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatNumber(p.withTargetLift.bauAudience)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-success/10">
                  <TableCell>DS Audience</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatNumber(p.withTargetLift.dsAudience)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-success/10">
                  <TableCell>DS Value/Customer</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatCurrency(p.withTargetLift.dsValuePerCustomer, inputs.currency)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-success/10">
                  <TableCell>Total DS Value</TableCell>
                  {projections.map((p) => (
                    <TableCell key={p.month} className="text-right font-mono text-sm">
                      {formatCurrency(p.withTargetLift.totalDsValue, inputs.currency, true)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-success/10 border-b-2">
                  <TableCell className="font-medium">Total Value</TableCell>
                  {projections.map((p) => (
                    <TableCell
                      key={p.month}
                      className="text-right font-mono text-sm font-semibold text-success"
                    >
                      {formatCurrency(p.withTargetLift.totalValue, inputs.currency, true)}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Incremental Section */}
                <TableRow className="bg-highlight/50">
                  <TableCell
                    rowSpan={2}
                    className="font-medium bg-highlight border-r"
                  >
                    Incremental
                  </TableCell>
                  <TableCell>Monthly Value</TableCell>
                  {projections.map((p) => (
                    <TableCell
                      key={p.month}
                      className="text-right font-mono text-sm font-semibold"
                    >
                      {formatCurrency(p.incrementalValue, inputs.currency, true)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-highlight/50">
                  <TableCell>Cumulative</TableCell>
                  {projections.map((p) => (
                    <TableCell
                      key={p.month}
                      className="text-right font-mono text-sm font-bold text-accent"
                    >
                      {formatCurrency(p.cumulativeValue, inputs.currency, true)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
