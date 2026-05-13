"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InitialData } from "@/lib/use-case-types";
import { CURRENCIES } from "@/lib/calculator-types";
import { ArrowLeft, Sparkles, TrendingUp, DollarSign, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ContentOptimizerCalculatorProps {
  initialData: InitialData;
  onBack: () => void;
}

interface ContentOptimizerInputs {
  currency: string;
  useCaseName: string;
  monthlyMessages: number;
  currentOpenRate: number;
  currentClickRate: number;
  currentConversionRate: number;
  revenuePerConversion: number;
  expectedOpenRateLift: number;
  expectedClickRateLift: number;
  expectedConversionLift: number;
}

const DEFAULT_CONTENT_INPUTS: ContentOptimizerInputs = {
  currency: "EUR",
  useCaseName: "Content Optimization",
  monthlyMessages: 5000000,
  currentOpenRate: 25,
  currentClickRate: 3.5,
  currentConversionRate: 2.0,
  revenuePerConversion: 45,
  expectedOpenRateLift: 15,
  expectedClickRateLift: 20,
  expectedConversionLift: 12,
};

function calculateContentResults(inputs: ContentOptimizerInputs) {
  const {
    monthlyMessages,
    currentOpenRate,
    currentClickRate,
    currentConversionRate,
    revenuePerConversion,
    expectedOpenRateLift,
    expectedClickRateLift,
    expectedConversionLift,
  } = inputs;

  // Current metrics
  const currentOpens = monthlyMessages * (currentOpenRate / 100);
  const currentClicks = currentOpens * (currentClickRate / 100);
  const currentConversions = currentClicks * (currentConversionRate / 100);
  const currentRevenue = currentConversions * revenuePerConversion;

  // Optimized metrics
  const optimizedOpenRate = currentOpenRate * (1 + expectedOpenRateLift / 100);
  const optimizedClickRate = currentClickRate * (1 + expectedClickRateLift / 100);
  const optimizedConversionRate = currentConversionRate * (1 + expectedConversionLift / 100);

  const optimizedOpens = monthlyMessages * (optimizedOpenRate / 100);
  const optimizedClicks = optimizedOpens * (optimizedClickRate / 100);
  const optimizedConversions = optimizedClicks * (optimizedConversionRate / 100);
  const optimizedRevenue = optimizedConversions * revenuePerConversion;

  // Incremental value
  const monthlyIncrementalRevenue = optimizedRevenue - currentRevenue;
  const annualIncrementalRevenue = monthlyIncrementalRevenue * 12;

  // Generate monthly projections
  const monthlyProjections = Array.from({ length: 12 }, (_, i) => {
    const rampUp = Math.min(1, (i + 1) / 3); // 3-month ramp up
    return {
      month: new Date(2024, i).toLocaleString("default", { month: "short" }),
      currentRevenue: currentRevenue,
      optimizedRevenue: currentRevenue + monthlyIncrementalRevenue * rampUp,
      incrementalValue: monthlyIncrementalRevenue * rampUp,
    };
  });

  return {
    current: {
      openRate: currentOpenRate,
      clickRate: currentClickRate,
      conversionRate: currentConversionRate,
      conversions: currentConversions,
      revenue: currentRevenue,
    },
    optimized: {
      openRate: optimizedOpenRate,
      clickRate: optimizedClickRate,
      conversionRate: optimizedConversionRate,
      conversions: optimizedConversions,
      revenue: optimizedRevenue,
    },
    incrementalConversions: optimizedConversions - currentConversions,
    monthlyIncrementalRevenue,
    annualIncrementalRevenue,
    monthlyProjections,
  };
}

export function ContentOptimizerCalculator({ initialData, onBack }: ContentOptimizerCalculatorProps) {
  const [inputs, setInputs] = useState<ContentOptimizerInputs>({
    ...DEFAULT_CONTENT_INPUTS,
    useCaseName: initialData.companyName
      ? `${initialData.companyName} - Content Optimizer`
      : "Content Optimization",
  });

  const results = useMemo(() => calculateContentResults(inputs), [inputs]);
  const currencySymbol = CURRENCIES.find((c) => c.value === inputs.currency)?.symbol || "$";

  const handleChange = (field: keyof ContentOptimizerInputs, value: string | number) => {
    setInputs({ ...inputs, [field]: value });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(Math.round(value));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Content Optimizer Calculator
                  </h1>
                  {initialData.companyName && (
                    <p className="text-sm text-muted-foreground">
                      {initialData.companyName} {initialData.industry && `| ${initialData.industry}`}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Calculate the value of AI-powered content optimization and personalization
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
        <div className="space-y-8">
          {/* Input Form */}
          <Card className="border-2 border-border">
            <CardHeader className="bg-chart-2 pb-4">
              <CardTitle className="text-lg font-semibold text-white">
                Key Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6">
                {/* Basic Info */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={inputs.currency}
                      onValueChange={(value) => handleChange("currency", value)}
                    >
                      <SelectTrigger id="currency" className="bg-highlight">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((curr) => (
                          <SelectItem key={curr.value} value={curr.value}>
                            {curr.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="useCaseName">Use Case Name</Label>
                    <Input
                      id="useCaseName"
                      value={inputs.useCaseName}
                      onChange={(e) => handleChange("useCaseName", e.target.value)}
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyMessages">Monthly Messages Sent</Label>
                    <Input
                      id="monthlyMessages"
                      type="number"
                      value={inputs.monthlyMessages}
                      onChange={(e) => handleChange("monthlyMessages", Number(e.target.value))}
                      className="bg-card text-right"
                    />
                  </div>
                </div>

                {/* Current Metrics */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Current Performance</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentOpenRate">Open Rate (%)</Label>
                      <Input
                        id="currentOpenRate"
                        type="number"
                        step="0.1"
                        value={inputs.currentOpenRate}
                        onChange={(e) => handleChange("currentOpenRate", Number(e.target.value))}
                        className="bg-card text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentClickRate">Click Rate (%)</Label>
                      <Input
                        id="currentClickRate"
                        type="number"
                        step="0.1"
                        value={inputs.currentClickRate}
                        onChange={(e) => handleChange("currentClickRate", Number(e.target.value))}
                        className="bg-card text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentConversionRate">Conversion Rate (%)</Label>
                      <Input
                        id="currentConversionRate"
                        type="number"
                        step="0.1"
                        value={inputs.currentConversionRate}
                        onChange={(e) => handleChange("currentConversionRate", Number(e.target.value))}
                        className="bg-card text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revenuePerConversion">Revenue per Conversion</Label>
                      <div className="relative">
                        <Input
                          id="revenuePerConversion"
                          type="number"
                          step="0.01"
                          value={inputs.revenuePerConversion}
                          onChange={(e) => handleChange("revenuePerConversion", Number(e.target.value))}
                          className="bg-card text-right pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currencySymbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expected Lifts */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Expected Lift from Optimization</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expectedOpenRateLift">Open Rate Lift (%)</Label>
                      <Input
                        id="expectedOpenRateLift"
                        type="number"
                        step="1"
                        value={inputs.expectedOpenRateLift}
                        onChange={(e) => handleChange("expectedOpenRateLift", Number(e.target.value))}
                        className="bg-highlight text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedClickRateLift">Click Rate Lift (%)</Label>
                      <Input
                        id="expectedClickRateLift"
                        type="number"
                        step="1"
                        value={inputs.expectedClickRateLift}
                        onChange={(e) => handleChange("expectedClickRateLift", Number(e.target.value))}
                        className="bg-highlight text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedConversionLift">Conversion Lift (%)</Label>
                      <Input
                        id="expectedConversionLift"
                        type="number"
                        step="1"
                        value={inputs.expectedConversionLift}
                        onChange={(e) => handleChange("expectedConversionLift", Number(e.target.value))}
                        className="bg-highlight text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-chart-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Incremental Value</p>
                    <p className="text-xl font-bold text-chart-2">
                      {formatCurrency(results.annualIncrementalRevenue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Incremental Revenue</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatCurrency(results.monthlyIncrementalRevenue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Additional Conversions/mo</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatNumber(results.incrementalConversions)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Optimized Conversion Rate</p>
                    <p className="text-xl font-bold text-foreground">
                      {results.optimized.conversionRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="revenue">Revenue Impact</TabsTrigger>
              <TabsTrigger value="metrics">Metrics Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Projection Over 12 Months</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      currentRevenue: { label: "Current Revenue", color: "hsl(var(--muted-foreground))" },
                      optimizedRevenue: { label: "Optimized Revenue", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={results.monthlyProjections}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${currencySymbol}${(value / 1000).toFixed(0)}k`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="currentRevenue"
                          stackId="1"
                          stroke="var(--color-muted-foreground)"
                          fill="var(--color-muted)"
                          name="Current Revenue"
                        />
                        <Area
                          type="monotone"
                          dataKey="incrementalValue"
                          stackId="1"
                          stroke="var(--color-chart-2)"
                          fill="var(--color-chart-2)"
                          fillOpacity={0.6}
                          name="Incremental Value"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="metrics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current vs Optimized Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      current: { label: "Current", color: "hsl(var(--muted-foreground))" },
                      optimized: { label: "Optimized", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            metric: "Open Rate",
                            current: results.current.openRate,
                            optimized: results.optimized.openRate,
                          },
                          {
                            metric: "Click Rate",
                            current: results.current.clickRate,
                            optimized: results.optimized.clickRate,
                          },
                          {
                            metric: "Conversion Rate",
                            current: results.current.conversionRate,
                            optimized: results.optimized.conversionRate,
                          },
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                        <YAxis dataKey="metric" type="category" width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="current" fill="var(--color-muted-foreground)" name="Current" />
                        <Bar dataKey="optimized" fill="var(--color-chart-2)" name="Optimized" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Braze Value Calculator - Content Optimizer
          </p>
        </div>
      </footer>
    </div>
  );
}
