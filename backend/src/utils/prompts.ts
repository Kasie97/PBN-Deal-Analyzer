import { DealData } from "../types/index.js";

export function buildInitialPrompt(
  dealData: DealData
): string {
  const {
    dealSize,
    role,
    industry,
    stage,
    challenge,
    timelineMonths,
    closeDate,
    decisionMaker,
    stakeholders,
    budgetStatus,
    whatYouTried,
    competitor,
    additionalContext
  } = dealData;

  const closeDateObj = new Date(closeDate);

  const today = new Date();

  const daysUntilClose = Math.ceil(
    (closeDateObj.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return `
Analyze this enterprise sales deal.

SALES REP PROFILE
- Role: ${role}
- Industry: ${industry}

DEAL INFORMATION
- Deal Size: $${dealSize?.toLocaleString()}
- Current Stage: ${stage}
- Timeline: ${timelineMonths}
- Days Until Close: ${daysUntilClose}
- Decision Maker: ${decisionMaker || "Unknown"}
- Budget Status: ${budgetStatus || "Unknown"}

PRIMARY CHALLENGE
"${challenge}"

STAKEHOLDERS / BLOCKERS
${stakeholders || "Not provided"}

PREVIOUS ATTEMPTS
${whatYouTried || "None provided"}

COMPETITORS
${competitor || "None mentioned"}

ADDITIONAL CONTEXT
${additionalContext || "None"}

Analyze:
- likelihood of closing
- stakeholder alignment
- sales execution quality
- timeline realism
- hidden risks
- next best actions
`;
}




// import { DealData } from "../types/index.js";

// export function buildInitialPrompt(dealData: DealData): string {
//   const {
//     dealSize,
//     role,
//     industry,
//     stage,
//     challenge,
//     timelineMonths,
//     closeDate,
//     decisionMaker,
//     stakeholders,
//     budgetStatus,
//     whatYouTried,
//     competitor,
//     additionalContext
//   } = dealData;

//   const closeDateObj = new Date(closeDate);
//   const today = new Date();

//   const daysUntilClose = Math.ceil(
//     (closeDateObj.getTime() - today.getTime()) /
//       (1000 * 60 * 60 * 24)
//   );

//   return `
// You are advising a ${role} in the ${industry} industry.

// DEAL DETAILS:
// - Deal Size: $${dealSize?.toLocaleString() || "unknown"}
// - Current Stage: ${stage}
// - Days Until Target Close: ${daysUntilClose}
// - Timeline in Deal: ${timelineMonths}
// - Decision Maker: ${decisionMaker || "unknown"}
// - Budget Status: ${budgetStatus || "unknown"}

// THEIR MAIN CHALLENGE:
// "${challenge}"

// CONTEXT:
// ${whatYouTried ? `- What they've tried: ${whatYouTried}` : "- No prior attempts mentioned"}
// ${stakeholders ? `- Other stakeholders/blockers: ${stakeholders}` : ""}
// ${competitor ? `- Competing against: ${competitor}` : ""}
// ${additionalContext ? `- Additional context: ${additionalContext}` : ""}

// Please provide:

// 1. Deal Probability Score
// 2. Root Cause Analysis
// 3. Top 3 Tactical Next Steps
// 4. Objection Handling Strategy
// 5. Risk Factors
// 6. Timeline Recommendation
// `;
// }