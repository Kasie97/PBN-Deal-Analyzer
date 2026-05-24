import Anthropic from "@anthropic-ai/sdk";

import {
  AnalyzeDealPayload,
  AnalyzeDealResponse,
  ConversationMessage,
  DealAnalysisResult
} from "../types/index.js";

import { buildInitialPrompt } from "../utils/prompts.js";

import {
  loadConversation,
  saveConversation
} from "../utils/supabase.js";

import { SYSTEM_PROMPT } from "../utils/system-prompt.js";

import { validateAnalyzeDealPayload } from "../utils/validators.js";

import { trimConversationHistory } from "../utils/conversation.js";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function analyzeDeal(
  payload: AnalyzeDealPayload
): Promise<AnalyzeDealResponse> {
  validateAnalyzeDealPayload(payload);

  const {
    sessionId,
    dealData,
    followUpQuestion
  } = payload;

  let conversationHistory: ConversationMessage[] =
    await loadConversation(sessionId);

  conversationHistory =
    trimConversationHistory(
      conversationHistory
    );

  if (
    !followUpQuestion &&
    conversationHistory.length === 0
  ) {
    if (!dealData) {
      throw new Error(
        "Deal data is required"
      );
    }

    const initialPrompt =
      buildInitialPrompt(dealData);

    conversationHistory.push({
      role: "user",
      content: initialPrompt
    });
  }

  if (followUpQuestion) {
    conversationHistory.push({
      role: "user",
      content: `
FOLLOW UP QUESTION:

${followUpQuestion}

Important:
Maintain consistency with previous deal analysis.
`
    });
  }

  const response =
    await client.messages.create({
      model:
        "claude-sonnet-4",

      max_tokens: 1500,

      temperature: 0.4,

      system: SYSTEM_PROMPT,

      messages: conversationHistory
    });

  const textBlock =
    response.content.find(
      (item) => item.type === "text"
    );

  const rawResponse =
    textBlock?.text ||
    "No response generated.";

  let parsedAnalysis: DealAnalysisResult;

  try {
    parsedAnalysis = JSON.parse(
      rawResponse
    ) as DealAnalysisResult;
  } catch (error) {
    console.error(
      "Failed to parse Claude JSON:",
      rawResponse
    );

    throw new Error(
      "AI response formatting failed"
    );
  }

  conversationHistory.push({
    role: "assistant",
    content: JSON.stringify(
      parsedAnalysis
    )
  });

  await saveConversation(
    sessionId,
    conversationHistory
  );

  return {
    success: true,
    sessionId,
    analysis: parsedAnalysis
  };
}
