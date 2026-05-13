"use client";

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
import { CalculatorInputs, CURRENCIES } from "@/lib/calculator-types";

interface InputFormProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

export function InputForm({ inputs, onChange }: InputFormProps) {
  const handleChange = (field: keyof CalculatorInputs, value: string | number) => {
    onChange({ ...inputs, [field]: value });
  };

  return (
    <Card className="border-2 border-border">
      <CardHeader className="bg-primary pb-4">
        <CardTitle className="text-lg font-semibold text-primary-foreground">
          Key Inputs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          {/* Basic Info Section */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium">
                Currency
              </Label>
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
              <p className="text-xs text-muted-foreground">1. Select your currency</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="useCaseName" className="text-sm font-medium">
                Use Case Name
              </Label>
              <Input
                id="useCaseName"
                value={inputs.useCaseName}
                onChange={(e) => handleChange("useCaseName", e.target.value)}
                className="bg-card"
              />
              <p className="text-xs text-muted-foreground">2. Name this use case</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kickOffDate" className="text-sm font-medium">
                Date of Kick-off
              </Label>
              <Input
                id="kickOffDate"
                type="date"
                value={inputs.kickOffDate}
                onChange={(e) => handleChange("kickOffDate", e.target.value)}
                className="bg-card"
              />
              <p className="text-xs text-muted-foreground">3. Select Kick-Off date</p>
            </div>
          </div>

          {/* Business Case Settings */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessCaseMetric" className="text-sm font-medium italic">
                Business Case Metric Label
              </Label>
              <Select
                value={inputs.businessCaseMetric}
                onValueChange={(value) =>
                  handleChange("businessCaseMetric", value as "Conversion" | "Retention" | "Revenue")
                }
              >
                <SelectTrigger id="businessCaseMetric" className="bg-success text-success-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conversion">Conversion</SelectItem>
                  <SelectItem value="Retention">Retention</SelectItem>
                  <SelectItem value="Revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                5. Updates labeling. Choose 8A OR 8B for input
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberType" className="text-sm font-medium">
                Annual or Monthly Numbers?
              </Label>
              <Select
                value={inputs.numberType}
                onValueChange={(value) =>
                  handleChange("numberType", value as "Monthly" | "Annual")
                }
              >
                <SelectTrigger id="numberType" className="bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                6. Enter if the values are monthly or annual
              </p>
            </div>
          </div>

          {/* Numeric Inputs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="eligibleAudience" className="text-sm font-medium">
                Eligible Audience ({inputs.numberType})
              </Label>
              <Input
                id="eligibleAudience"
                type="number"
                value={inputs.eligibleAudience}
                onChange={(e) =>
                  handleChange("eligibleAudience", Number(e.target.value))
                }
                className="bg-card text-right"
              />
              <p className="text-xs text-muted-foreground">
                7. Enter the estimated {inputs.numberType.toLowerCase()} audience
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversionRate" className="text-sm font-medium">
                {inputs.businessCaseMetric} Rate
              </Label>
              <div className="relative">
                <Input
                  id="conversionRate"
                  type="number"
                  step="0.1"
                  value={inputs.conversionRate}
                  onChange={(e) =>
                    handleChange("conversionRate", Number(e.target.value))
                  }
                  className="bg-highlight text-right pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                8A. Complete 8A OR 8B, you don&apos;t need both
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionsPerCustomer" className="text-sm font-medium">
                Transactions per Customer
              </Label>
              <Input
                id="transactionsPerCustomer"
                type="number"
                step="0.1"
                value={inputs.transactionsPerCustomer}
                onChange={(e) =>
                  handleChange("transactionsPerCustomer", Number(e.target.value))
                }
                className="bg-highlight text-right"
              />
              <p className="text-xs text-muted-foreground">
                8B. 8A OR 8B, you don&apos;t need both
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bauLiftOverHoldout" className="text-sm font-medium">
                BAU Lift over Holdout
              </Label>
              <div className="relative">
                <Input
                  id="bauLiftOverHoldout"
                  type="number"
                  step="0.1"
                  value={inputs.bauLiftOverHoldout}
                  onChange={(e) =>
                    handleChange("bauLiftOverHoldout", Number(e.target.value))
                  }
                  className="bg-highlight text-right pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                9. Enter measured lift over holdout
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valuePerConversion" className="text-sm font-medium">
                Value per {inputs.businessCaseMetric}
              </Label>
              <div className="relative">
                <Input
                  id="valuePerConversion"
                  type="number"
                  step="0.01"
                  value={inputs.valuePerConversion}
                  onChange={(e) =>
                    handleChange("valuePerConversion", Number(e.target.value))
                  }
                  className="bg-highlight text-right pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {CURRENCIES.find((c) => c.value === inputs.currency)?.symbol}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                10. Enter average conversion value
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="costPerConversion" className="text-sm font-medium">
                Costs per {inputs.businessCaseMetric} (e.g. Discounts)
              </Label>
              <div className="relative">
                <Input
                  id="costPerConversion"
                  type="number"
                  step="0.01"
                  value={inputs.costPerConversion}
                  onChange={(e) =>
                    handleChange("costPerConversion", Number(e.target.value))
                  }
                  className="bg-highlight text-right pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {CURRENCIES.find((c) => c.value === inputs.currency)?.symbol}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                11. Enter average conversion cost
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
