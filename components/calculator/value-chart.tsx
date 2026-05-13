"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorResults, CalculatorInputs } from "@/lib/calculator-types";
import { formatCurrency } from "@/lib/calculator-utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface ValueChartProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

export function ValueChart({ results, inputs }: ValueChartProps) {
  const chartData = results.monthlyProjections.map((projection) => ({
    month: projection.month,
    "Without DS": projection.totalValue,
    "With DS (Target Lift)": projection.withTargetLift.totalValue,
    "Incremental Value": projection.incrementalValue,
    "Cumulative Incremental": projection.cumulativeValue,
  }));

  const currencySymbol = inputs.currency === "EUR" ? "€" : inputs.currency === "USD" ? "$" : inputs.currency === "GBP" ? "£" : "¥";

  return (
    <div className="grid gap-6">
      {/* Value Over Time Chart */}
      <Card className="border-2 border-border">
        <CardHeader className="bg-primary pb-4">
          <CardTitle className="text-lg font-semibold text-primary-foreground">
            Value Over Time
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  interval={2}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `${currencySymbol}${(value / 1000000).toFixed(1)}M`
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    formatCurrency(value, inputs.currency)
                  }
                  labelStyle={{ color: "var(--foreground)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Without DS"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="With DS (Target Lift)"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cumulative Incremental Value */}
      <Card className="border-2 border-border">
        <CardHeader className="bg-success pb-4">
          <CardTitle className="text-lg font-semibold text-success-foreground">
            Cumulative Incremental Value
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  interval={2}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `${currencySymbol}${(value / 1000000).toFixed(1)}M`
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    formatCurrency(value, inputs.currency)
                  }
                  labelStyle={{ color: "var(--foreground)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Cumulative Incremental"
                  stroke="var(--success)"
                  fill="var(--success)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
