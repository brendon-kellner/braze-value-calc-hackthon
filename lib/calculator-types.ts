export interface CalculatorInputs {
  currency: string;
  useCaseName: string;
  kickOffDate: string;
  businessCaseMetric: "Conversion" | "Retention" | "Revenue";
  numberType: "Monthly" | "Annual";
  eligibleAudience: number;
  conversionRate: number;
  transactionsPerCustomer: number;
  bauLiftOverHoldout: number;
  valuePerConversion: number;
  costPerConversion: number;
}

export interface MonthlyProjection {
  month: string;
  holdoutAudience: number;
  holdoutValuePerCustomer: number;
  totalHoldoutValue: number;
  bauAudience: number;
  bauValuePerCustomer: number;
  totalBauValue: number;
  totalValue: number;
  withTargetLift: {
    holdoutAudience: number;
    totalHoldoutValue: number;
    bauAudience: number;
    totalBauValue: number;
    dsAudience: number;
    dsValuePerCustomer: number;
    totalDsValue: number;
    totalValue: number;
  };
  incrementalValue: number;
  cumulativeValue: number;
}

export interface CalculatorResults {
  annualizedRunRate: {
    low: number;
    target: number;
    high: number;
  };
  totalValueGenerated: {
    holdout: number;
    bau: number;
    ds: number;
  };
  monthlyProjections: MonthlyProjection[];
  valuePerCustomer: {
    holdout: number;
    bau: number;
  };
  liftBenchmarks: {
    low: number;
    target: number;
    high: number;
  };
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  currency: "EUR",
  useCaseName: "Use Case 1",
  kickOffDate: new Date().toISOString().split("T")[0],
  businessCaseMetric: "Conversion",
  numberType: "Monthly",
  eligibleAudience: 2000000,
  conversionRate: 12.0,
  transactionsPerCustomer: 5.5,
  bauLiftOverHoldout: 15.0,
  valuePerConversion: 80.0,
  costPerConversion: 5.0,
};

export const CURRENCIES = [
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "USD", label: "US Dollar ($)", symbol: "$" },
  { value: "GBP", label: "British Pound (£)", symbol: "£" },
  { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥" },
];

export const LIFT_BENCHMARKS = {
  low: 3.0,
  target: 12.0,
  high: 32.0,
};
