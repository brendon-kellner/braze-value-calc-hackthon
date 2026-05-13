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
import { ArrowLeft, Headphones, Clock, DollarSign, TrendingUp, Users } from "lucide-react";
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

interface AgentConsoleCalculatorProps {
  initialData: InitialData;
  onBack: () => void;
}

interface AgentConsoleInputs {
  currency: string;
  useCaseName: string;
  numberOfAgents: number;
  avgHandleTimeMinutes: number;
  interactionsPerAgentPerDay: number;
  costPerAgentHour: number;
  avgRevenuePerInteraction: number;
  currentResolutionRate: number;
  expectedHandleTimeReduction: number;
  expectedResolutionRateImprovement: number;
  expectedRevenueUplift: number;
}

const DEFAULT_AGENT_INPUTS: AgentConsoleInputs = {
  currency: "EUR",
  useCaseName: "Agent Console",
  numberOfAgents: 150,
  avgHandleTimeMinutes: 8,
  interactionsPerAgentPerDay: 45,
  costPerAgentHour: 35,
  avgRevenuePerInteraction: 25,
  currentResolutionRate: 72,
  expectedHandleTimeReduction: 20,
  expectedResolutionRateImprovement: 15,
  expectedRevenueUplift: 10,
};

function calculateAgentResults(inputs: AgentConsoleInputs) {
  const {
    numberOfAgents,
    avgHandleTimeMinutes,
    interactionsPerAgentPerDay,
    costPerAgentHour,
    avgRevenuePerInteraction,
    currentResolutionRate,
    expectedHandleTimeReduction,
    expectedResolutionRateImprovement,
    expectedRevenueUplift,
  } = inputs;

  const workingDaysPerMonth = 22;
  const workingDaysPerYear = 264;

  // Current metrics
  const dailyInteractions = numberOfAgents * interactionsPerAgentPerDay;
  const monthlyInteractions = dailyInteractions * workingDaysPerMonth;
  const yearlyInteractions = dailyInteractions * workingDaysPerYear;

  const currentHandleTimeHours = (avgHandleTimeMinutes / 60) * dailyInteractions;
  const currentDailyCost = currentHandleTimeHours * costPerAgentHour;
  const currentMonthlyRevenue = monthlyInteractions * avgRevenuePerInteraction * (currentResolutionRate / 100);

  // Optimized metrics
  const optimizedHandleTime = avgHandleTimeMinutes * (1 - expectedHandleTimeReduction / 100);
  const optimizedHandleTimeHours = (optimizedHandleTime / 60) * dailyInteractions;
  const optimizedDailyCost = optimizedHandleTimeHours * costPerAgentHour;
  const dailyCostSavings = currentDailyCost - optimizedDailyCost;
  const monthlyCostSavings = dailyCostSavings * workingDaysPerMonth;
  const yearlyCostSavings = dailyCostSavings * workingDaysPerYear;

  const optimizedResolutionRate = Math.min(100, currentResolutionRate * (1 + expectedResolutionRateImprovement / 100));
  const optimizedRevenuePerInteraction = avgRevenuePerInteraction * (1 + expectedRevenueUplift / 100);
  const optimizedMonthlyRevenue = monthlyInteractions * optimizedRevenuePerInteraction * (optimizedResolutionRate / 100);
  const monthlyRevenueUplift = optimizedMonthlyRevenue - currentMonthlyRevenue;
  const yearlyRevenueUplift = monthlyRevenueUplift * 12;

  // Total value
  const monthlyTotalValue = monthlyCostSavings + monthlyRevenueUplift;
  const yearlyTotalValue = yearlyCostSavings + yearlyRevenueUplift;

  // Time saved
  const dailyTimeSavedMinutes = (avgHandleTimeMinutes - optimizedHandleTime) * dailyInteractions;
  const monthlyTimeSavedHours = (dailyTimeSavedMinutes / 60) * workingDaysPerMonth;

  // Additional interactions possible with saved time
  const additionalInteractionsPerDay = dailyTimeSavedMinutes / optimizedHandleTime;
  const additionalInteractionsPerMonth = additionalInteractionsPerDay * workingDaysPerMonth;

  // Generate monthly projections
  const monthlyProjections = Array.from({ length: 12 }, (_, i) => {
    const rampUp = Math.min(1, (i + 1) / 4); // 4-month ramp up
    return {
      month: new Date(2024, i).toLocaleString("default", { month: "short" }),
      costSavings: monthlyCostSavings * rampUp,
      revenueUplift: monthlyRevenueUplift * rampUp,
      totalValue: monthlyTotalValue * rampUp,
    };
  });

  return {
    current: {
      handleTime: avgHandleTimeMinutes,
      resolutionRate: currentResolutionRate,
      monthlyRevenue: currentMonthlyRevenue,
      monthlyCost: currentDailyCost * workingDaysPerMonth,
    },
    optimized: {
      handleTime: optimizedHandleTime,
      resolutionRate: optimizedResolutionRate,
      monthlyRevenue: optimizedMonthlyRevenue,
      monthlyCost: optimizedDailyCost * workingDaysPerMonth,
    },
    savings: {
      monthlyCostSavings,
      yearlyCostSavings,
      monthlyRevenueUplift,
      yearlyRevenueUplift,
      monthlyTotalValue,
      yearlyTotalValue,
      monthlyTimeSavedHours,
      additionalInteractionsPerMonth,
    },
    monthlyProjections,
    monthlyInteractions,
    yearlyInteractions,
  };
}

export function AgentConsoleCalculator({ initialData, onBack }: AgentConsoleCalculatorProps) {
  const [inputs, setInputs] = useState<AgentConsoleInputs>({
    ...DEFAULT_AGENT_INPUTS,
    useCaseName: initialData.companyName
      ? `${initialData.companyName} - Agent Console`
      : "Agent Console",
  });

  const results = useMemo(() => calculateAgentResults(inputs), [inputs]);
  const currencySymbol = CURRENCIES.find((c) => c.value === inputs.currency)?.symbol || "$";

  const handleChange = (field: keyof AgentConsoleInputs, value: string | number) => {
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
                <div className="h-10 w-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Agent Console Calculator
                  </h1>
                  {initialData.companyName && (
                    <p className="text-sm text-muted-foreground">
                      {initialData.companyName} {initialData.industry && `| ${initialData.industry}`}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Calculate the value of AI-assisted agent productivity and customer engagement
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
            <CardHeader className="bg-chart-3 pb-4">
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
                    <Label htmlFor="numberOfAgents">Number of Agents</Label>
                    <Input
                      id="numberOfAgents"
                      type="number"
                      value={inputs.numberOfAgents}
                      onChange={(e) => handleChange("numberOfAgents", Number(e.target.value))}
                      className="bg-card text-right"
                    />
                  </div>
                </div>

                {/* Current Metrics */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Current Performance</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="avgHandleTimeMinutes">Avg Handle Time (minutes)</Label>
                      <Input
                        id="avgHandleTimeMinutes"
                        type="number"
                        step="0.5"
                        value={inputs.avgHandleTimeMinutes}
                        onChange={(e) => handleChange("avgHandleTimeMinutes", Number(e.target.value))}
                        className="bg-card text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interactionsPerAgentPerDay">Interactions per Agent/Day</Label>
                      <Input
                        id="interactionsPerAgentPerDay"
                        type="number"
                        value={inputs.interactionsPerAgentPerDay}
                        onChange={(e) => handleChange("interactionsPerAgentPerDay", Number(e.target.value))}
                        className="bg-card text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentResolutionRate">Resolution Rate (%)</Label>
                      <Input
                        id="currentResolutionRate"
                        type="number"
                        step="1"
                        value={inputs.currentResolutionRate}
                        onChange={(e) => handleChange("currentResolutionRate", Number(e.target.value))}
                        className="bg-card text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="costPerAgentHour">Cost per Agent Hour</Label>
                      <div className="relative">
                        <Input
                          id="costPerAgentHour"
                          type="number"
                          step="0.01"
                          value={inputs.costPerAgentHour}
                          onChange={(e) => handleChange("costPerAgentHour", Number(e.target.value))}
                          className="bg-card text-right pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currencySymbol}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avgRevenuePerInteraction">Avg Revenue per Interaction</Label>
                      <div className="relative">
                        <Input
                          id="avgRevenuePerInteraction"
                          type="number"
                          step="0.01"
                          value={inputs.avgRevenuePerInteraction}
                          onChange={(e) => handleChange("avgRevenuePerInteraction", Number(e.target.value))}
                          className="bg-card text-right pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currencySymbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expected Improvements */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Expected Improvements</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expectedHandleTimeReduction">Handle Time Reduction (%)</Label>
                      <Input
                        id="expectedHandleTimeReduction"
                        type="number"
                        step="1"
                        value={inputs.expectedHandleTimeReduction}
                        onChange={(e) => handleChange("expectedHandleTimeReduction", Number(e.target.value))}
                        className="bg-highlight text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedResolutionRateImprovement">Resolution Rate Improvement (%)</Label>
                      <Input
                        id="expectedResolutionRateImprovement"
                        type="number"
                        step="1"
                        value={inputs.expectedResolutionRateImprovement}
                        onChange={(e) => handleChange("expectedResolutionRateImprovement", Number(e.target.value))}
                        className="bg-highlight text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedRevenueUplift">Revenue Uplift (%)</Label>
                      <Input
                        id="expectedRevenueUplift"
                        type="number"
                        step="1"
                        value={inputs.expectedRevenueUplift}
                        onChange={(e) => handleChange("expectedRevenueUplift", Number(e.target.value))}
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
            <Card className="border-2 border-chart-3">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Total Value</p>
                    <p className="text-xl font-bold text-chart-3">
                      {formatCurrency(results.savings.yearlyTotalValue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Cost Savings</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatCurrency(results.savings.yearlyCostSavings)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Hours Saved/Month</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatNumber(results.savings.monthlyTimeSavedHours)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Add&apos;l Interactions/Month</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatNumber(results.savings.additionalInteractionsPerMonth)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="value" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="value">Value Breakdown</TabsTrigger>
              <TabsTrigger value="metrics">Metrics Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="value" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Value Projection Over 12 Months</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      costSavings: { label: "Cost Savings", color: "hsl(var(--success))" },
                      revenueUplift: { label: "Revenue Uplift", color: "hsl(var(--chart-3))" },
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
                          dataKey="costSavings"
                          stackId="1"
                          stroke="var(--color-success)"
                          fill="var(--color-success)"
                          fillOpacity={0.6}
                          name="Cost Savings"
                        />
                        <Area
                          type="monotone"
                          dataKey="revenueUplift"
                          stackId="1"
                          stroke="var(--color-chart-3)"
                          fill="var(--color-chart-3)"
                          fillOpacity={0.6}
                          name="Revenue Uplift"
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
                      optimized: { label: "Optimized", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            metric: "Handle Time (min)",
                            current: results.current.handleTime,
                            optimized: results.optimized.handleTime,
                          },
                          {
                            metric: "Resolution Rate (%)",
                            current: results.current.resolutionRate,
                            optimized: results.optimized.resolutionRate,
                          },
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="metric" type="category" width={120} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="current" fill="var(--color-muted-foreground)" name="Current" />
                        <Bar dataKey="optimized" fill="var(--color-chart-3)" name="Optimized" />
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
            Braze Value Calculator - Agent Console
          </p>
        </div>
      </footer>
    </div>
  );
}
