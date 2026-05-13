export type Industry = 
  | "retail"
  | "financial_services"
  | "telecom"
  | "healthcare"
  | "energy_utilities"
  | "travel"
  | "food_beverage"
  | "technology"
  | "other";

export type UseCaseType = 
  | "repurchase"
  | "upsell_cross_sell"
  | "renewal_retention"
  | "acquisition"
  | "onboarding_activation"
  | "referrals"
  | "cart_abandonment"
  | "pricing_optimization"
  | "ad_optimization";

export interface CaseStudy {
  id: string;
  title: string;
  industry: Industry;
  industries: Industry[]; // Additional relevant industries
  useCaseType: UseCaseType;
  useCaseTypes: UseCaseType[]; // Additional relevant use case types
  region: string;
  upliftPercentage: number;
  upliftMetric: string;
  annualBenefit?: string;
  context: string;
  keyInsight: string;
  channels: string[];
  personalizedDimensions: string[];
  justification: string;
}

export const industryLabels: Record<Industry, string> = {
  retail: "Retail & E-commerce",
  financial_services: "Financial Services",
  telecom: "Telecommunications",
  healthcare: "Healthcare",
  energy_utilities: "Energy & Utilities",
  travel: "Travel & Hospitality",
  food_beverage: "Food & Beverage (QSR)",
  technology: "Technology",
  other: "Other",
};

export const useCaseTypeLabels: Record<UseCaseType, string> = {
  repurchase: "Repurchase / Re-engagement",
  upsell_cross_sell: "Upsell / Cross-sell",
  renewal_retention: "Renewal / Retention",
  acquisition: "Lead Acquisition",
  onboarding_activation: "Onboarding / Activation",
  referrals: "Referrals",
  cart_abandonment: "Cart Abandonment",
  pricing_optimization: "Pricing Optimization",
  ad_optimization: "Ad Optimization",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "contact_lens_repurchase",
    title: "D2C Healthcare - Repurchase Optimization",
    industry: "healthcare",
    industries: ["retail", "healthcare"],
    useCaseType: "repurchase",
    useCaseTypes: ["repurchase", "renewal_retention"],
    region: "USA",
    upliftPercentage: 10.5,
    upliftMetric: "Conversion Rate",
    context: "Contact lens retailer used static email messages, refreshed through A/B testing a few times a year. All customers at risk of attrition received the same sequence on the same frequency.",
    keyInsight: "Achieved 10% uplift using zero-discount levers like timing and frequency.",
    channels: ["Email", "SMS"],
    personalizedDimensions: ["Subject Line", "Day of Week", "Time of Day", "Outreach Frequency", "Channel"],
    justification: "Similar businesses in healthcare/retail with subscription or replenishment models can expect 8-12% uplift by optimizing send timing and frequency without discounts. The AI identifies optimal contact patterns for each customer segment.",
  },
  {
    id: "telecom_upsell",
    title: "Telecom - Mobile Tier Upsell",
    industry: "telecom",
    industries: ["telecom", "technology"],
    useCaseType: "upsell_cross_sell",
    useCaseTypes: ["upsell_cross_sell"],
    region: "Oceania",
    upliftPercentage: 23,
    upliftMetric: "Upgrade Rate",
    context: "Previously limited in the number of A/B tests and segments that could be tested. Relied on blanket promotions to drive response rates.",
    keyInsight: "Personalized discounting led to 14% increase in net revenue per upgrade while also driving 23% increase in upgrade rate.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Day of Week", "Time of Day", "Outreach Frequency", "Offer Type"],
    justification: "Telecom and subscription businesses can achieve 15-25% uplift in upgrade rates by personalizing offer types (tier upgrades vs. data incentives vs. financial incentives) based on customer usage patterns.",
  },
  {
    id: "home_security_renewal",
    title: "Home Security - Contract Renewal",
    industry: "retail",
    industries: ["retail", "technology"],
    useCaseType: "renewal_retention",
    useCaseTypes: ["renewal_retention", "upsell_cross_sell"],
    region: "North America",
    upliftPercentage: 100,
    upliftMetric: "Incremental NPV per Customer",
    annualBenefit: "$15M",
    context: "Prior to Decisioning Studio, personalization was based on a risk propensity model. Initial AI suggestions went against their model's predictions, inspiring a revamped marketing strategy.",
    keyInsight: "Automated renewal optimization delivered ROI by managing offer combinations impossible to test manually.",
    channels: ["Email", "Phone", "Postal"],
    personalizedDimensions: ["Extension Length", "Rate Change", "Credit Offer", "Equipment Discount", "Channel"],
    justification: "Businesses with contract renewals can expect significant lift (50-100%+) by optimizing the combination of offer terms, timing, and channel. The AI tests thousands of combinations simultaneously.",
  },
  {
    id: "big_box_ad_optimization",
    title: "Big Box Retailer - Facebook Ads Optimization",
    industry: "retail",
    industries: ["retail"],
    useCaseType: "ad_optimization",
    useCaseTypes: ["ad_optimization", "acquisition"],
    region: "North America",
    upliftPercentage: 230,
    upliftMetric: "Revenue per Customer",
    context: "Privacy changes reduced customer data flow to Facebook. The business had valuable first-party data on customer history & engagement.",
    keyInsight: "Used first-party data to set optimal bid strategies and values for each customer type.",
    channels: ["Facebook Ads"],
    personalizedDimensions: ["Max CPC", "Target ROAS", "Bidding Strategy"],
    justification: "Retailers with first-party data can achieve 100-250% uplift in ad-driven revenue by using AI to optimize bidding strategies based on customer traits like website activity and purchase history.",
  },
  {
    id: "bank_referrals",
    title: "Small Business Bank - Credit Card Referrals",
    industry: "financial_services",
    industries: ["financial_services"],
    useCaseType: "referrals",
    useCaseTypes: ["referrals"],
    region: "North America",
    upliftPercentage: 92,
    upliftMetric: "Referral Conversions",
    annualBenefit: "$16M",
    context: "The bank had done significant A/B testing but wanted to personalize using customer data without risking unsubscribes.",
    keyInsight: "AI personalized based on 113 customer characteristics, shifting from single-day sends to optimized weekly distribution.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Headline", "Creative/Image", "Day of Week", "Time of Day"],
    justification: "Financial services companies can expect 50-100% uplift in referral programs by personalizing messaging based on customer tenure, spend patterns, and credit profile.",
  },
  {
    id: "fintech_activation",
    title: "Fintech - Credit Card Activation",
    industry: "financial_services",
    industries: ["financial_services"],
    useCaseType: "onboarding_activation",
    useCaseTypes: ["onboarding_activation"],
    region: "North America",
    upliftPercentage: 10,
    upliftMetric: "Activation Rate",
    context: "Before Decisioning Studio, the bank was emailing customers twice a week over a two-week period with 4 email variations.",
    keyInsight: "AI-driven experimentation enabled 10K different user journeys across 100K customers weekly, increasing clicks by 92%.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Day of Week", "Time of Day", "Outreach Frequency", "CTA"],
    justification: "Financial services and fintech companies can expect 8-15% uplift in activation rates by optimizing the onboarding journey timing and messaging for each customer.",
  },
  {
    id: "energy_pricing",
    title: "Global Energy Company - Pricing Optimization",
    industry: "energy_utilities",
    industries: ["energy_utilities"],
    useCaseType: "pricing_optimization",
    useCaseTypes: ["pricing_optimization"],
    region: "Global",
    upliftPercentage: 26,
    upliftMetric: "Total Profitability",
    annualBenefit: "$3M",
    context: "Power and electricity sold through third-party brokers with daily price sheets. Sales team spent hours using trial-and-error to fine-tune pricing.",
    keyInsight: "AI simultaneously tests 80,000 different data points to adjust pricing twice a week, optimizing margins.",
    channels: ["Broker Price Sheets"],
    personalizedDimensions: ["Price Point", "Rate Premium", "Contract Terms"],
    justification: "Energy and utility companies can achieve 20-30% profitability uplift by using AI to optimize pricing across thousands of micro-segments.",
  },
  {
    id: "utility_web_conversion",
    title: "Utility Provider - Web Conversion Optimization",
    industry: "energy_utilities",
    industries: ["energy_utilities", "retail"],
    useCaseType: "acquisition",
    useCaseTypes: ["acquisition", "pricing_optimization"],
    region: "North America",
    upliftPercentage: 44,
    upliftMetric: "Customer Lifetime Value",
    annualBenefit: "$4.3M",
    context: "Using AI to determine the best pricing point to acquire customers and maximize lifetime value across ~3M micro-segments (URL + zip code + utility combinations).",
    keyInsight: "AI offers higher rates to customers from greener, denser, high GDP/capita states; lower rates to those with external offers.",
    channels: ["Web"],
    personalizedDimensions: ["Rate", "Term Length", "Introductory Offers"],
    justification: "Utility and service providers can expect 30-50% uplift in customer LTV by optimizing web pricing based on geographic and demographic micro-segments.",
  },
  {
    id: "camera_cross_sell",
    title: "Consumer Electronics - Cross-sell",
    industry: "retail",
    industries: ["retail", "technology"],
    useCaseType: "upsell_cross_sell",
    useCaseTypes: ["upsell_cross_sell", "repurchase"],
    region: "North America",
    upliftPercentage: 11,
    upliftMetric: "Revenue per Customer",
    context: "Marketing team spent considerable effort developing & orchestrating evergreen campaigns manually.",
    keyInsight: "DS maintained marketing productivity after 60% reduction in workforce by automating personalization.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Creative/Image", "CTA", "Day of Week"],
    justification: "Retail and e-commerce businesses can expect 8-15% revenue uplift by personalizing cross-sell campaigns based on purchase history and engagement patterns.",
  },
  {
    id: "energy_lead_acquisition",
    title: "Energy Provider - Google Ads Lead Acquisition",
    industry: "energy_utilities",
    industries: ["energy_utilities"],
    useCaseType: "acquisition",
    useCaseTypes: ["acquisition", "ad_optimization"],
    region: "North America",
    upliftPercentage: 34,
    upliftMetric: "Cost per Acquisition (Reduction)",
    context: "Wanted to increase acquisitions in two key geographies while maintaining the same overall campaign spend.",
    keyInsight: "Reduced CPA by 34% in one region and 27% in another while increasing acquisition volume.",
    channels: ["Google Ads"],
    personalizedDimensions: ["Max CPA Bid", "Geographic Targeting"],
    justification: "Companies using paid acquisition can expect 25-35% reduction in CPA by using AI to optimize bidding strategies across geographic segments.",
  },
  {
    id: "qsr_repurchase",
    title: "Quick Service Restaurant - Repurchase",
    industry: "food_beverage",
    industries: ["food_beverage", "retail"],
    useCaseType: "repurchase",
    useCaseTypes: ["repurchase"],
    region: "North America",
    upliftPercentage: 10,
    upliftMetric: "Customer Repurchase Rate",
    annualBenefit: "$11M",
    context: "Goal was to use email to encourage customers to make their first 3 online purchases within 3 months of signup.",
    keyInsight: "Personalized email series generated greater uplift compared to non-personalized baseline.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Preview Text", "Featured Product", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "QSR and food delivery businesses can expect 8-12% uplift in repurchase rates by personalizing product recommendations and send timing.",
  },
  {
    id: "airline_cart_abandonment",
    title: "Global Airline - Cart Abandonment",
    industry: "travel",
    industries: ["travel"],
    useCaseType: "cart_abandonment",
    useCaseTypes: ["cart_abandonment"],
    region: "Global",
    upliftPercentage: 15,
    upliftMetric: "Conversion Rate",
    context: "Used Decisioning Studio to improve abandoned cart conversions with personalized follow-up emails.",
    keyInsight: "Creative relevance drove 80% of uplift, far outweighing segment-based targeting.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Headline", "Body Copy", "Hero Image", "CTA", "Hours After Search", "Number of Follow-ups"],
    justification: "Travel and e-commerce businesses can expect 10-20% uplift in cart abandonment recovery by personalizing creative elements and follow-up timing.",
  },
];

export function getMatchingCaseStudies(industry: Industry, useCaseType: UseCaseType): CaseStudy[] {
  // First, find exact matches
  const exactMatches = caseStudies.filter(
    cs => (cs.industry === industry || cs.industries.includes(industry)) &&
          (cs.useCaseType === useCaseType || cs.useCaseTypes.includes(useCaseType))
  );

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  // If no exact matches, find by use case type only
  const useCaseMatches = caseStudies.filter(
    cs => cs.useCaseType === useCaseType || cs.useCaseTypes.includes(useCaseType)
  );

  if (useCaseMatches.length > 0) {
    return useCaseMatches;
  }

  // If still no matches, find by industry only
  const industryMatches = caseStudies.filter(
    cs => cs.industry === industry || cs.industries.includes(industry)
  );

  if (industryMatches.length > 0) {
    return industryMatches;
  }

  // Return top 3 case studies as fallback
  return caseStudies.slice(0, 3);
}

export function getAverageUplift(caseStudies: CaseStudy[]): number {
  if (caseStudies.length === 0) return 15; // Default assumption
  const sum = caseStudies.reduce((acc, cs) => acc + cs.upliftPercentage, 0);
  return Math.round(sum / caseStudies.length);
}

export function getUpliftRange(caseStudies: CaseStudy[]): { min: number; max: number } {
  if (caseStudies.length === 0) return { min: 10, max: 20 };
  const uplifts = caseStudies.map(cs => cs.upliftPercentage);
  return {
    min: Math.min(...uplifts),
    max: Math.max(...uplifts),
  };
}
