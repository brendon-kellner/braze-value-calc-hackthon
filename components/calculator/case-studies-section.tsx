"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Industry, 
  UseCaseType, 
  CaseStudy,
  industryLabels, 
  useCaseTypeLabels, 
  getMatchingCaseStudies,
  getAverageUplift,
  getUpliftRange 
} from "@/lib/case-studies-data";
import { TrendingUp, Building2, Target, CheckCircle2, Lightbulb, ArrowUpRight } from "lucide-react";

interface CaseStudiesSectionProps {
  initialIndustry?: Industry;
  onUpliftChange?: (uplift: number) => void;
}

export function CaseStudiesSection({ initialIndustry, onUpliftChange }: CaseStudiesSectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(initialIndustry || "retail");
  const [selectedUseCaseType, setSelectedUseCaseType] = useState<UseCaseType>("repurchase");
  const [matchingCaseStudies, setMatchingCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const matches = getMatchingCaseStudies(selectedIndustry, selectedUseCaseType);
    setMatchingCaseStudies(matches);
    
    // Notify parent of average uplift change
    if (onUpliftChange) {
      const avgUplift = getAverageUplift(matches);
      onUpliftChange(avgUplift);
    }
  }, [selectedIndustry, selectedUseCaseType, onUpliftChange]);

  const upliftRange = getUpliftRange(matchingCaseStudies);
  const avgUplift = getAverageUplift(matchingCaseStudies);

  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Relevant Case Studies</CardTitle>
            <CardDescription>
              Select your industry and use case to see similar Decisioning Studio implementations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selection Dropdowns */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industry" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Industry
            </Label>
            <Select value={selectedIndustry} onValueChange={(v) => setSelectedIndustry(v as Industry)}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(industryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="useCase" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              Use Case Type
            </Label>
            <Select value={selectedUseCaseType} onValueChange={(v) => setSelectedUseCaseType(v as UseCaseType)}>
              <SelectTrigger id="useCase">
                <SelectValue placeholder="Select use case" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(useCaseTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projected Uplift Summary */}
        <div className="rounded-lg border border-accent bg-accent/10 p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-accent" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projected Uplift Range</p>
                <p className="text-2xl font-bold text-foreground">
                  {upliftRange.min}% - {upliftRange.max}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Average Uplift</p>
              <p className="text-2xl font-bold text-accent">{avgUplift}%</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Based on {matchingCaseStudies.length} similar case {matchingCaseStudies.length === 1 ? 'study' : 'studies'} in {industryLabels[selectedIndustry]} with {useCaseTypeLabels[selectedUseCaseType]} use cases.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Matching Case Studies
          </h3>
          
          {matchingCaseStudies.length === 0 ? (
            <p className="text-muted-foreground text-sm">No exact matches found. Showing related case studies.</p>
          ) : (
            <div className="grid gap-4">
              {matchingCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="rounded-lg border bg-background p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-foreground">{caseStudy.title}</h4>
          <p className="text-sm text-muted-foreground">{caseStudy.region}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            +{caseStudy.upliftPercentage}% {caseStudy.upliftMetric}
          </Badge>
        </div>
      </div>

      {/* Key Insight */}
      <div className="rounded-md bg-primary/5 border border-primary/20 p-3">
        <p className="text-sm font-medium text-primary flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{caseStudy.keyInsight}</span>
        </p>
      </div>

      {/* Context */}
      <div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Context:</span> {caseStudy.context}
        </p>
      </div>

      {/* Justification */}
      <div className="rounded-md bg-accent/5 border border-accent/20 p-3">
        <p className="text-sm">
          <span className="font-medium text-accent">Why this applies to you:</span>{" "}
          <span className="text-muted-foreground">{caseStudy.justification}</span>
        </p>
      </div>

      {/* Channels & Dimensions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Channels Used</p>
          <div className="flex flex-wrap gap-1">
            {caseStudy.channels.map((channel) => (
              <Badge key={channel} variant="outline" className="text-xs">
                {channel}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Personalized Dimensions</p>
          <div className="flex flex-wrap gap-1">
            {caseStudy.personalizedDimensions.slice(0, 4).map((dim) => (
              <Badge key={dim} variant="outline" className="text-xs">
                {dim}
              </Badge>
            ))}
            {caseStudy.personalizedDimensions.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{caseStudy.personalizedDimensions.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Annual Benefit if available */}
      {caseStudy.annualBenefit && (
        <div className="pt-2 border-t">
          <p className="text-sm">
            <span className="font-medium text-foreground">Estimated Annual Benefit:</span>{" "}
            <span className="text-accent font-semibold">{caseStudy.annualBenefit}</span>
          </p>
        </div>
      )}
    </div>
  );
}
