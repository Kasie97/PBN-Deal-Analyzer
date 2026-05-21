import { useState } from 'react';

import type {
  DealData,
  ConversationItem,
  DealAnalysis
} from '../utils/types';

import AnalysisCard from './AnalysisCard';
import ReasoningSteps from './ReasoningSteps';
import RiskCard from './RiskCard';
import ActionCard from './ActionCard';
import SuggestedQuestions from './SuggestedQuestions';
import ExecutiveSummary from './ExecutiveSummary';

interface Props {
  dealData: DealData;
  analysis: DealAnalysis;
  conversationHistory: ConversationItem[];
  onFollowUp: (question: string) => void;
  isLoading: boolean;
}

export default function AnalysisResults({
  dealData,
  analysis,
  onFollowUp,
  isLoading
}: Props) {
  const [followUpQuestion, setFollowUpQuestion] =
    useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <ExecutiveSummary
        summary={analysis.executiveSummary}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <AnalysisCard title="Deal Score">
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-blue-600">
              {analysis.dealScore}
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Confidence
              </p>

              <p className="font-semibold">
                {analysis.confidence}
              </p>
            </div>
          </div>
        </AnalysisCard>

        <AnalysisCard title="Deal Snapshot">
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">
                Deal Size:
              </span>

              <div className="font-semibold">
                $
                {Number(
                  dealData.dealSize
                ).toLocaleString()}
              </div>
            </div>

            <div>
              <span className="text-gray-500">
                Stage:
              </span>

              <div className="font-semibold capitalize">
                {dealData.stage}
              </div>
            </div>
          </div>
        </AnalysisCard>
      </div>

      <AnalysisCard title="AI Reasoning Process">
        <ReasoningSteps
          steps={analysis.reasoningSteps}
        />
      </AnalysisCard>

      <AnalysisCard title="Top Risks">
        <RiskCard risks={analysis.topRisks} />
      </AnalysisCard>

      <AnalysisCard title="Recommended Actions">
        <ActionCard
          actions={analysis.recommendedActions}
        />
      </AnalysisCard>

      <AnalysisCard title="Suggested Follow-Ups">
        <SuggestedQuestions
          onSelect={onFollowUp}
        />
      </AnalysisCard>

      <AnalysisCard title="Ask Follow-Up Question">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (
              followUpQuestion.trim()
            ) {
              onFollowUp(
                followUpQuestion
              );

              setFollowUpQuestion('');
            }
          }}
          className="space-y-4"
        >
          <textarea
            value={followUpQuestion}
            onChange={(e) =>
              setFollowUpQuestion(
                e.target.value
              )
            }
            rows={4}
            placeholder="Ask the AI strategist another question..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={
              isLoading ||
              !followUpQuestion.trim()
            }
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
          >
            {isLoading
              ? 'Analyzing...'
              : 'Ask AI Strategist'}
          </button>
        </form>
      </AnalysisCard>
    </div>
  );
}
