export function validateAnalyzeDealPayload(payload) {
    if (!payload.sessionId) {
        throw new Error("Session ID is required");
    }
    if (!payload.followUpQuestion &&
        !payload.dealData) {
        throw new Error("Deal data is required for initial analysis");
    }
    if (payload.followUpQuestion) {
        if (payload.followUpQuestion.length > 2000) {
            throw new Error("Follow up question too long");
        }
    }
    if (payload.dealData) {
        if (!payload.dealData.challenge) {
            throw new Error("Challenge field is required");
        }
        if (!payload.dealData.stage) {
            throw new Error("Deal stage is required");
        }
    }
}
