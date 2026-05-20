export interface DealData {
  dealSize: string;
  role: string;
  industry: string;
  stage: string;
  challenge: string;
  timelineMonths: string;
  closeDate: string;
  decisionMaker: string;
  stakeholders: string;
  budgetStatus: string;
  whatYouTried: string;
  competitor: string;
  additionalContext: string;
}

export interface RecommendedAction {
  action: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedImpact: string;
}

export interface DealAnalysis {
  dealScore: number;
  confidence: 'Low' | 'Medium' | 'High';
  reasoningSteps: string[];
  rootCauseAnalysis: string[];
  topRisks: string[];
  recommendedActions: RecommendedAction[];
  objectionHandling: string[];
  timelineRecommendation: string;
  executiveSummary: string;
}

export interface ConversationItem {
  type: 'analysis' | 'question';
  content: string | DealAnalysis;
  timestamp: Date;
}

export interface AnalyzeResponse {
  success: boolean;
  sessionId: string;
  analysis: DealAnalysis;
}


// export interface DealData {
//   dealSize: string;
//   role: string;
//   industry: string;
//   stage: string;
//   challenge: string;
//   timelineMonths: string;
//   closeDate: string;
//   decisionMaker: string;
//   stakeholders: string;
//   budgetStatus: string;
//   whatYouTried: string;
//   competitor: string;
//   additionalContext: string;
// }

// export interface ConversationItem {
//   type: 'analysis' | 'question';
//   content: string;
//   timestamp: Date;
// }

// export interface AnalyzeResponse {
//   success: boolean;
//   analysis: string;
//   sessionId: string;
// }