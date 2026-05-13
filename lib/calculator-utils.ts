import {
  CalculatorInputs,
  CalculatorResults,
  MonthlyProjection,
  LIFT_BENCHMARKS,
} from "./calculator-types";

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const {
    eligibleAudience,
    conversionRate,
    transactionsPerCustomer,
    bauLiftOverHoldout,
    valuePerConversion,
    costPerConversion,
  } = inputs;

  // Base calculations
  const holdoutAudience = 100000; // Fixed holdout size
  const bauAudience = 1900000; // Rest goes to BAU

  // Value calculations
  const netValuePerConversion = valuePerConversion - costPerConversion;
  const holdoutValuePerCustomer =
    (conversionRate / 100) * transactionsPerCustomer * netValuePerConversion;
  const bauValuePerCustomer =
    holdoutValuePerCustomer * (1 + bauLiftOverHoldout / 100);

  // DS (Decisioning Studio) calculations with target lift
  const dsLiftFactor = 1 + LIFT_BENCHMARKS.target / 100;
  const dsValuePerCustomer = bauValuePerCustomer * dsLiftFactor;

  // Generate 24 months of projections
  const monthlyProjections: MonthlyProjection[] = [];
  const startDate = new Date(inputs.kickOffDate);
  let cumulativeValue = 0;

  for (let i = 0; i < 24; i++) {
    const monthDate = new Date(startDate);
    monthDate.setMonth(monthDate.getMonth() + i);
    const monthStr = monthDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    // Ramp-up factor (full value after 3 months)
    const rampFactor = Math.min(1, (i + 1) / 3);

    const monthHoldoutAudience = holdoutAudience;
    const monthBauAudience = bauAudience * rampFactor;

    const totalHoldoutValue = monthHoldoutAudience * holdoutValuePerCustomer;
    const totalBauValue = monthBauAudience * bauValuePerCustomer;
    const totalValue = totalHoldoutValue + totalBauValue;

    // With target lift calculations
    const dsAudience = monthBauAudience * 0.1; // 10% of BAU goes to DS
    const adjustedBauAudience = monthBauAudience * 0.9;
    const totalDsValue = dsAudience * dsValuePerCustomer;
    const adjustedBauValue = adjustedBauAudience * bauValuePerCustomer;
    const withLiftTotalValue =
      totalHoldoutValue + adjustedBauValue + totalDsValue;

    const incrementalValue = withLiftTotalValue - totalValue;
    cumulativeValue += incrementalValue;

    monthlyProjections.push({
      month: monthStr,
      holdoutAudience: monthHoldoutAudience,
      holdoutValuePerCustomer,
      totalHoldoutValue,
      bauAudience: monthBauAudience,
      bauValuePerCustomer,
      totalBauValue,
      totalValue,
      withTargetLift: {
        holdoutAudience: monthHoldoutAudience,
        totalHoldoutValue,
        bauAudience: adjustedBauAudience,
        totalBauValue: adjustedBauValue,
        dsAudience,
        dsValuePerCustomer,
        totalDsValue,
        totalValue: withLiftTotalValue,
      },
      incrementalValue,
      cumulativeValue,
    });
  }

  // Calculate annualized run rates based on month 12
  const month12 = monthlyProjections[11];
  const baseAnnualValue = month12.incrementalValue * 12;

  return {
    annualizedRunRate: {
      low: baseAnnualValue * (LIFT_BENCHMARKS.low / LIFT_BENCHMARKS.target),
      target: baseAnnualValue,
      high: baseAnnualValue * (LIFT_BENCHMARKS.high / LIFT_BENCHMARKS.target),
    },
    totalValueGenerated: {
      holdout: monthlyProjections.reduce(
        (sum, m) => sum + m.totalHoldoutValue,
        0
      ),
      bau: monthlyProjections.reduce((sum, m) => sum + m.totalBauValue, 0),
      ds: monthlyProjections.reduce(
        (sum, m) => sum + m.withTargetLift.totalDsValue,
        0
      ),
    },
    monthlyProjections,
    valuePerCustomer: {
      holdout: holdoutValuePerCustomer,
      bau: bauValuePerCustomer,
    },
    liftBenchmarks: LIFT_BENCHMARKS,
  };
}

export function formatCurrency(
  value: number,
  currency: string,
  compact?: boolean
): string {
  const symbols: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    JPY: "¥",
  };

  const symbol = symbols[currency] || currency;

  if (compact && Math.abs(value) >= 1000000) {
    return `${symbol}${(value / 1000000).toFixed(1)}M`;
  }
  if (compact && Math.abs(value) >= 1000) {
    return `${symbol}${(value / 1000).toFixed(0)}K`;
  }

  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
