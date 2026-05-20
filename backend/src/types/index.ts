export interface DealData {
  dealSize: number;
  role: string;
  industry: string;
  stage: string;
  challenge: string;
  timelineMonths: string;
  closeDate: string;
  decisionMaker?: string;
  stakeholders?: string;
  budgetStatus?: string;
  whatYouTried?: string;
  competitor?: string;
  additionalContext?: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RecommendedAction {
  action: string;
  priority: "High" | "Medium" | "Low";
  expectedImpact: string;
}

export interface DealAnalysisResult {
  dealScore: number;
  confidence: "Low" | "Medium" | "High";
  reasoningSteps: string[];
  rootCauseAnalysis: string[];
  topRisks: string[];
  recommendedActions: RecommendedAction[];
  objectionHandling: string[];
  timelineRecommendation: string;
  executiveSummary: string;
}

export interface AnalyzeDealPayload {
  sessionId: string;
  dealData?: DealData;
  followUpQuestion?: string;
}

export interface AnalyzeDealResponse {
  success: boolean;
  sessionId: string;
  analysis: DealAnalysisResult;
}



// export interface DealData {
//   dealSize: number;
//   role: string;
//   industry: string;
//   stage: string;
//   challenge: string;
//   timelineMonths: string;
//   closeDate: string;
//   decisionMaker?: string;
//   stakeholders?: string;
//   budgetStatus?: string;
//   whatYouTried?: string;
//   competitor?: string;
//   additionalContext?: string;
// }

// export interface ConversationMessage {
//   role: "user" | "assistant";
//   content: string;
// }

// export interface AnalyzeDealPayload {
//   sessionId: string;
//   dealData?: DealData;
//   followUpQuestion?: string;
// }

// export interface AnalyzeDealResponse {
//   success: boolean;
//   analysis: string;
//   sessionId: string;
// }