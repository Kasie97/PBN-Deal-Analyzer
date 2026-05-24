export function buildInitialPrompt(dealData) {
    const { dealSize, role, industry, stage, challenge, timelineMonths, closeDate, decisionMaker, stakeholders, budgetStatus, whatYouTried, competitor, additionalContext } = dealData;
    const closeDateObj = new Date(closeDate);
    const today = new Date();
    const daysUntilClose = Math.ceil((closeDateObj.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24));
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
