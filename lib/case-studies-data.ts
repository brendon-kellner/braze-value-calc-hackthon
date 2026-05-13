export type Industry = 
  | "retail"
  | "financial_services"
  | "telecom"
  | "healthcare"
  | "energy_utilities"
  | "travel"
  | "food_beverage"
  | "technology"
  | "media_entertainment"
  | "gaming"
  | "insurance"
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
  | "ad_optimization"
  | "winback"
  | "loyalty"
  | "churn_prevention"
  | "first_purchase";

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
  media_entertainment: "Media & Entertainment",
  gaming: "Gaming",
  insurance: "Insurance",
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
  winback: "Winback / Churn Prevention",
  loyalty: "Loyalty / Points Redemption",
  churn_prevention: "Cancel/Churn Prevention",
  first_purchase: "First Purchase Conversion",
};

export const caseStudies: CaseStudy[] = [
  // Original case studies
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
    justification: "Similar businesses in healthcare/retail with subscription or replenishment models can expect 8-12% uplift by optimizing send timing and frequency without discounts.",
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
    justification: "Telecom and subscription businesses can achieve 15-25% uplift in upgrade rates by personalizing offer types based on customer usage patterns.",
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
    justification: "Businesses with contract renewals can expect significant lift (50-100%+) by optimizing the combination of offer terms, timing, and channel.",
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
    justification: "Retailers with first-party data can achieve 100-250% uplift in ad-driven revenue by using AI to optimize bidding strategies.",
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
    justification: "Financial services companies can expect 50-100% uplift in referral programs by personalizing messaging based on customer tenure and spend patterns.",
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
    justification: "Financial services and fintech companies can expect 8-15% uplift in activation rates by optimizing the onboarding journey.",
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
    context: "Using AI to determine the best pricing point to acquire customers and maximize lifetime value across ~3M micro-segments.",
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
    justification: "Retail and e-commerce businesses can expect 8-15% revenue uplift by personalizing cross-sell campaigns based on purchase history.",
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
    upliftPercentage: 5.6,
    upliftMetric: "Revenue per Cart Abandonment",
    annualBenefit: "$73M",
    context: "Used Decisioning Studio to improve abandoned cart conversions with personalized follow-up emails.",
    keyInsight: "Creative and hours after latest search drove 80% of uplift, far outweighing other dimensions.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Hero Image", "Hours After Search", "Time of Day", "Frequency"],
    justification: "Travel and e-commerce businesses can expect 5-15% uplift in cart abandonment recovery by personalizing creative elements and follow-up timing.",
  },
  // New case studies from PDFs
  {
    id: "foxtel_reactivation",
    title: "Australian Streaming Media - Reactivation",
    industry: "media_entertainment",
    industries: ["media_entertainment", "telecom"],
    useCaseType: "winback",
    useCaseTypes: ["winback", "renewal_retention"],
    region: "Australia",
    upliftPercentage: 20,
    upliftMetric: "Incremental NPV per Customer",
    annualBenefit: "$3.3M",
    context: "Struggled with simplistic NPV model and rigid business rules. Moved from a basic model to one built on 100+ customer features.",
    keyInsight: "Delivered value in 12 weeks, increased reactivations per send by 14.6% and incremental NPV by $3.3M annually.",
    channels: ["Email", "Push"],
    personalizedDimensions: ["Message", "Offer", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "Streaming and subscription media companies can expect 15-25% NPV uplift by personalizing reactivation offers based on customer viewing history and preferences.",
  },
  {
    id: "foxtel_cross_sell",
    title: "Australian Streaming - Cross-sell Entertainment & Sports",
    industry: "media_entertainment",
    industries: ["media_entertainment"],
    useCaseType: "upsell_cross_sell",
    useCaseTypes: ["upsell_cross_sell"],
    region: "Australia",
    upliftPercentage: 103,
    upliftMetric: "Incremental NPV per Sports Customer",
    annualBenefit: "$2M",
    context: "BINGE and Kayo Sports struggled to cross-sell with traditional bundling and static promotions. Experimented across 1M+ unique combinations.",
    keyInsight: "103% uplift for sports customers, 32% for entertainment customers. Delivered value in 12 weeks.",
    channels: ["Email"],
    personalizedDimensions: ["Creative", "Offer", "Offer Duration", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "Multi-platform media companies can achieve 30-100%+ cross-sell uplift by personalizing offers based on viewing preferences and subscription history.",
  },
  {
    id: "kayo_cancel_prevention",
    title: "Australian Sports Streaming - Cancel Prevention",
    industry: "media_entertainment",
    industries: ["media_entertainment"],
    useCaseType: "churn_prevention",
    useCaseTypes: ["churn_prevention", "renewal_retention"],
    region: "Australia",
    upliftPercentage: 19.5,
    upliftMetric: "Reduction in Cancellations per Attempt",
    annualBenefit: "$9M",
    context: "Rising cancellations at season end with no personalized interventions. High acquisition costs made retention critical.",
    keyInsight: "AI personalized retention offers, finding the lowest discount necessary to prevent churn. $9M incremental NPV from averted cancellations.",
    channels: ["In-App", "Email"],
    personalizedDimensions: ["Incentive Amount", "Duration of Incentive"],
    justification: "Subscription businesses can expect 15-25% reduction in churn by personalizing retention offers to find the minimum discount needed per customer.",
  },
  {
    id: "bank_cross_sell",
    title: "North American Bank - Small Business Cross-sell",
    industry: "financial_services",
    industries: ["financial_services"],
    useCaseType: "upsell_cross_sell",
    useCaseTypes: ["upsell_cross_sell"],
    region: "North America",
    upliftPercentage: 67,
    upliftMetric: "New Accounts Booked per Customer",
    annualBenefit: "$2.5M",
    context: "After referral success, scaled AI decisioning to cross-sell small business accounts. Experimented across 150 unique email variants.",
    keyInsight: "8 weeks time to value. Discovered which of 100+ customer features mattered most for driving bookings.",
    channels: ["Email"],
    personalizedDimensions: ["Message", "Product", "Creative", "CTA", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "Financial services can expect 40-70% uplift in cross-sell by personalizing product recommendations based on customer income, existing products, and behavior.",
  },
  {
    id: "hotel_cart_abandonment",
    title: "Global Hotel Brand - Cart Abandonment",
    industry: "travel",
    industries: ["travel"],
    useCaseType: "cart_abandonment",
    useCaseTypes: ["cart_abandonment"],
    region: "Global",
    upliftPercentage: 46,
    upliftMetric: "Unique Daily Clicks per Send",
    context: "Modernized martech stack but messaging remained static. Lacked understanding of drivers of customer behaviors.",
    keyInsight: "Grew clicks by 46% and decreased unsubscribes by more than 25%. Now implementing AI across their loyalty platform.",
    channels: ["Email"],
    personalizedDimensions: ["Message", "Template", "Time of Day", "CTA"],
    justification: "Hospitality and travel businesses can expect 30-50% uplift in cart abandonment clicks by personalizing message templates and timing.",
  },
  {
    id: "wargaming_first_purchase",
    title: "Video Game Publisher - Free-to-Paid Conversion",
    industry: "gaming",
    industries: ["gaming", "technology"],
    useCaseType: "first_purchase",
    useCaseTypes: ["first_purchase", "onboarding_activation"],
    region: "Global",
    upliftPercentage: 6.3,
    upliftMetric: "Free-to-Paid Conversion Rate",
    context: "Freemium model with offers sent at fixed times to broad segments. Experimented across 39,000+ unique combinations.",
    keyInsight: "AI decisioning boosted incremental impact by 75%—from +3.6% to +6.3%. Identified key indicators from 100+ customer features.",
    channels: ["In-Game"],
    personalizedDimensions: ["Offer Type", "Trigger Group", "Bundle Configuration"],
    justification: "Gaming and freemium businesses can expect 5-10% conversion uplift by personalizing in-game offers based on player behavior and milestones.",
  },
  {
    id: "green_energy_pricing",
    title: "Green Energy Retailer - Web Pricing Optimization",
    industry: "energy_utilities",
    industries: ["energy_utilities"],
    useCaseType: "pricing_optimization",
    useCaseTypes: ["pricing_optimization", "acquisition"],
    region: "North America",
    upliftPercentage: 89,
    upliftMetric: "LTV per Quote Requested",
    annualBenefit: "$1.3M",
    context: "Grown through direct mail and door-to-door but needed to convert digital traffic. Built 8M+ micro-segments from limited website data.",
    keyInsight: "Unlocked deep insights into customer preferences across contract types. Less price-sensitive customers favor intro-rate plans.",
    channels: ["Web"],
    personalizedDimensions: ["Recommended Rate", "Contract Type", "Term Length"],
    justification: "Energy retailers can expect 50-90% LTV uplift by personalizing web pricing based on visitor signals like zip code and traffic source.",
  },
  {
    id: "cpg_repurchase",
    title: "CPG Retailer - Repurchase Optimization",
    industry: "retail",
    industries: ["retail"],
    useCaseType: "repurchase",
    useCaseTypes: ["repurchase"],
    region: "Global",
    upliftPercentage: 5.6,
    upliftMetric: "Omnichannel Revenue per Customer",
    context: "Sending promotional emails daily with calendered approach. Struggled to personalize at scale with agency-produced creative.",
    keyInsight: "23% uplift in email CTR, 3% increase in repeat buyers. AI autonomously adopted new email variants daily.",
    channels: ["Email"],
    personalizedDimensions: ["Message", "Focus", "CTA", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "CPG and retail businesses can expect 5-10% revenue uplift by automating personalization of daily promotional campaigns.",
  },
  {
    id: "health_insurance_arrears",
    title: "Private Health Insurance - Winback in Arrears",
    industry: "insurance",
    industries: ["insurance", "healthcare"],
    useCaseType: "winback",
    useCaseTypes: ["winback", "renewal_retention"],
    region: "Australia",
    upliftPercentage: 15,
    upliftMetric: "Daily Policies Exiting Arrears",
    context: "Lean team relied on fixed 90-day journey. A/B testing couldn't reach statistical significance with small sample size.",
    keyInsight: "Proved AI effectiveness in regulated industry while coordinating messaging across email, push, SMS, and phone.",
    channels: ["Email", "SMS", "Push", "Phone/IVR"],
    personalizedDimensions: ["Channel", "Creative", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "Insurance and healthcare companies can expect 10-20% improvement in collections/winback by personalizing multi-channel outreach.",
  },
  {
    id: "fast_casual_loyalty",
    title: "Fast Casual Restaurant - Loyalty Repurchase",
    industry: "food_beverage",
    industries: ["food_beverage"],
    useCaseType: "loyalty",
    useCaseTypes: ["loyalty", "repurchase"],
    region: "North America",
    upliftPercentage: 4,
    upliftMetric: "Net Sales vs Global Control",
    context: "Went from simple A/B testing to 1:1 personalization. Tested across 5 cohorts including AI-tailored, random, BAU, and control.",
    keyInsight: "+2-3% customer revenue growth, +1.5% profit lift for loyalty members. Catalyzed creation of dedicated AI Marketing Program.",
    channels: ["Email", "Push", "In-App"],
    personalizedDimensions: ["Offer", "Image", "Message", "Day of Week", "Time of Day", "Frequency", "Tone"],
    justification: "QSR and restaurant chains can expect 2-5% net sales uplift by personalizing loyalty communications based on purchase history and preferences.",
  },
  {
    id: "latam_telecom_upsell",
    title: "Latin American Telecom - Upsell/Cross-sell",
    industry: "telecom",
    industries: ["telecom"],
    useCaseType: "upsell_cross_sell",
    useCaseTypes: ["upsell_cross_sell"],
    region: "Latin America",
    upliftPercentage: 63,
    upliftMetric: "Incremental Revenue per Contacted Customer",
    context: "Manual A/B testing limited plan presentation options. BrazeAI activated ~1.5M AI-powered contacts with 400+ unique offer templates.",
    keyInsight: "63% uplift in incremental revenue. Now expanding to additional markets and implementing across multiple use cases.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "Upsell Plan", "Terms/Discount", "CTA", "Time of Day", "Day of Week", "Outreach Frequency"],
    justification: "Telecom companies can expect 40-70% revenue uplift by personalizing upsell offers based on current plan and usage patterns.",
  },
  {
    id: "convenience_store_repurchase",
    title: "Latin American Convenience Store - Repurchase",
    industry: "retail",
    industries: ["retail", "food_beverage"],
    useCaseType: "repurchase",
    useCaseTypes: ["repurchase", "loyalty"],
    region: "Latin America",
    upliftPercentage: 0.81,
    upliftMetric: "In-store Purchases",
    annualBenefit: "$16M",
    context: "Already had sophisticated 100+ segment strategy. Partnering with DS served as automation play for dynamic content.",
    keyInsight: "0.81% statistically significant uplift extremely large for the chain. Now expanded into more use cases driving entire rewards program.",
    channels: ["Email", "SMS", "Push"],
    personalizedDimensions: ["Subject Line", "Type of Offer", "Category", "Day of Week", "Time of Day", "Outreach Frequency", "Channel"],
    justification: "Convenience and retail chains can achieve significant incremental value even with small percentage lifts due to scale and frequency of purchases.",
  },
  {
    id: "convenience_store_loyalty",
    title: "Latin American Convenience Store - Points Redemption",
    industry: "retail",
    industries: ["retail", "food_beverage"],
    useCaseType: "loyalty",
    useCaseTypes: ["loyalty"],
    region: "Latin America",
    upliftPercentage: 263,
    upliftMetric: "Margin per Client",
    annualBenefit: "$300M MXN projected",
    context: "Already had sophisticated segmentation and templates based on points balance and personas. DS enabled dynamic content.",
    keyInsight: "263% uplift in margin per client. Now planning expansion across channels with >$300M MXN projected annual impact.",
    channels: ["Email"],
    personalizedDimensions: ["Email Header", "Redemption SKU", "CTA", "Subject Line", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "Loyalty programs can achieve massive margin uplift (100-300%) by personalizing redemption offers based on customer point balance and preferences.",
  },
  {
    id: "review_app_push",
    title: "Review App - Push Notification Personalization",
    industry: "technology",
    industries: ["technology"],
    useCaseType: "onboarding_activation",
    useCaseTypes: ["onboarding_activation", "repurchase"],
    region: "Global",
    upliftPercentage: 24,
    upliftMetric: "Push-to-Session Conversions",
    context: "Had experimentation for mobile pushes but campaigns sent based on fixed qualification criteria.",
    keyInsight: "Moved to continuous experimentation on multiple dimensions allowing for 1:1 personalization based on user attributes and behavior.",
    channels: ["Push"],
    personalizedDimensions: ["Push Text", "Push Title", "Day of Week", "Time of Day", "Outreach Frequency"],
    justification: "Mobile apps can expect 15-30% uplift in push engagement by personalizing notifications based on user behavior and preferences.",
  },
  {
    id: "fintech_activation_clicks",
    title: "Fintech App - Activation Engagement",
    industry: "financial_services",
    industries: ["financial_services", "technology"],
    useCaseType: "onboarding_activation",
    useCaseTypes: ["onboarding_activation"],
    region: "Global",
    upliftPercentage: 140,
    upliftMetric: "Click Rate",
    context: "Used DS to optimize unique clicks served to activation audience across multiple dimensions.",
    keyInsight: "140% lift in clicks. Found that different templates and subject lines performed best with specific CTAs.",
    channels: ["Email"],
    personalizedDimensions: ["Subject Line", "CTA", "Hero Image", "Day of Week", "Time of Day", "Frequency"],
    justification: "Fintech and mobile banking apps can expect 50-150% engagement uplift by personalizing activation emails based on user profile and behavior.",
  },
  {
    id: "qsr_winback",
    title: "QSR - Winback Campaign",
    industry: "food_beverage",
    industries: ["food_beverage"],
    useCaseType: "winback",
    useCaseTypes: ["winback", "churn_prevention"],
    region: "North America",
    upliftPercentage: 11.7,
    upliftMetric: "Net Revenue per Customer",
    annualBenefit: "$5M",
    context: "60M+ customers with 20+ years of data but static BAU winback campaign. Had invested millions in custom MABs which were scrapped.",
    keyInsight: "8 weeks time to value. Discovered which of 100+ customer features mattered most. Enhanced data pipeline accuracy.",
    channels: ["Email"],
    personalizedDimensions: ["Message", "Creative", "Day of Week", "Time of Day", "Outreach Frequency", "CTA"],
    justification: "QSR chains can expect 10-15% net revenue uplift from winback by personalizing offers based on customer order history and preferences.",
  },
  {
    id: "qsr_churn_clicks",
    title: "QSR - Churn Prevention Engagement",
    industry: "food_beverage",
    industries: ["food_beverage"],
    useCaseType: "churn_prevention",
    useCaseTypes: ["churn_prevention", "winback"],
    region: "North America",
    upliftPercentage: 65,
    upliftMetric: "Unique Daily Clicks per Customer",
    annualBenefit: "$3M (across 2 use cases)",
    context: "Had churn propensity models but struggled with interventions. Needed to turn scores into actionable customer-level decisions.",
    keyInsight: "Delivered value in 3 weeks. Turned churn scores into actionable insights. Catalyzed plan for 30+ use cases by 2027.",
    channels: ["Email"],
    personalizedDimensions: ["Message", "Creative", "Day of Week", "Time of Day", "Outreach Frequency", "CTA"],
    justification: "Businesses with churn models can expect 40-70% engagement uplift by converting propensity scores into personalized interventions.",
  },
  {
    id: "qsr_welcome_journey",
    title: "QSR - Welcome Journey Optimization",
    industry: "food_beverage",
    industries: ["food_beverage"],
    useCaseType: "onboarding_activation",
    useCaseTypes: ["onboarding_activation"],
    region: "North America",
    upliftPercentage: 155,
    upliftMetric: "Clicks per Customer",
    context: "Fixed 15-day welcome journey for all new loyalty members. Fragmented CX with siloed digital and in-store touchpoints.",
    keyInsight: "BrazeAI outperformed BAU within 5 days. 25% uplift in conversions vs BAU. Tested 3M+ unique combinations.",
    channels: ["Email", "Push", "In-App"],
    personalizedDimensions: ["Message", "Creative", "Day of Week", "Time of Day", "Outreach Frequency", "CTA"],
    justification: "Loyalty programs can expect 100-200% engagement uplift in welcome journeys by personalizing based on signup behavior and early interactions.",
  },
  {
    id: "mexican_qsr_frequency",
    title: "Mexican QSR - Frequency Boost",
    industry: "food_beverage",
    industries: ["food_beverage"],
    useCaseType: "repurchase",
    useCaseTypes: ["repurchase", "loyalty"],
    region: "North America",
    upliftPercentage: 0.55,
    upliftMetric: "Transactions per Customer",
    annualBenefit: "$6.5M",
    context: "Previously determined morning was best send time through A/B testing. Now sends at 50 unique times throughout the day.",
    keyInsight: "2.6x incremental impact vs what BAU drives. AI uses 150+ customer features to personalize timing and messaging.",
    channels: ["Email", "Push", "In-App"],
    personalizedDimensions: ["Product Category", "Subject Line", "Pre-header", "CTA", "Day of Week", "Time of Day", "Outreach Frequency", "Tone"],
    justification: "QSR chains can expect significant annualized revenue impact by personalizing timing based on individual customer purchase patterns.",
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
    min: Math.round(Math.min(...uplifts) * 10) / 10,
    max: Math.round(Math.max(...uplifts) * 10) / 10,
  };
}
