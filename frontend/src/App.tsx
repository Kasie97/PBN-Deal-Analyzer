import { useState } from 'react';

import DealForm from './components/DealForm';
import AnalysisResults from './components/AnalysisResults';
import LoadingSpinner from './components/LoadingSpinner';

import {
  analyzeDeal,
  askFollowUp
} from './utils/api';

import {
  getSessionId
} from './utils/sessionStorage';

import type {
  DealData,
  DealAnalysis,
  ConversationItem
} from './utils/types';

export default function App() {
  const [sessionId] =
    useState(getSessionId);

  const [step, setStep] =
    useState<'form' | 'results'>(
      'form'
    );

  const [loading, setLoading] =
    useState(false);

  const [dealData, setDealData] =
    useState<DealData | null>(null);

  const [analysis, setAnalysis] =
    useState<DealAnalysis | null>(
      null
    );

  const [
    conversationHistory,
    setConversationHistory
  ] = useState<ConversationItem[]>(
    []
  );

  const handleFormSubmit =
    async (data: DealData) => {
      setLoading(true);

      try {
        const result =
          await analyzeDeal(
            sessionId,
            data
          );

        setDealData(data);

        setAnalysis(result.analysis);

        setConversationHistory([
          {
            type: 'analysis',
            content:
              result.analysis,
            timestamp: new Date()
          }
        ]);

        setStep('results');
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : 'Analysis failed'
        );
      } finally {
        setLoading(false);
      }
    };

  const handleFollowUp =
    async (question: string) => {
      setLoading(true);

      try {
        const result =
          await askFollowUp(
            sessionId,
            question
          );

        setAnalysis(result.analysis);

        setConversationHistory(
          (prev) => [
            ...prev,
            {
              type: 'question',
              content: question,
              timestamp: new Date()
            },
            {
              type: 'analysis',
              content:
                result.analysis,
              timestamp: new Date()
            }
          ]
        );
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : 'Follow-up failed'
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Bluechip AI Deal Strategist
            </h1>

            <p className="text-gray-600 mt-1">
              Enterprise Sales Intelligence Platform
            </p>
          </div>

          {step === 'results' && (
            <button
              onClick={() =>
                window.location.reload()
              }
              className="bg-gray-900 text-white px-5 py-3 rounded-xl"
            >
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {loading && <LoadingSpinner />}

        {!loading &&
          step === 'form' && (
            <DealForm
              onSubmit={
                handleFormSubmit
              }
            />
          )}

        {!loading &&
          step === 'results' &&
          analysis &&
          dealData && (
            <AnalysisResults
              dealData={dealData}
              analysis={analysis}
              conversationHistory={
                conversationHistory
              }
              onFollowUp={
                handleFollowUp
              }
              isLoading={loading}
            />
          )}
      </main>
    </div>
  );
}



// import { useState } from 'react';
// import DealForm from './components/DealForm';
// import AnalysisResults from './components/AnalysisResults';
// import LoadingSpinner from './components/LoadingSpinner';

// import { getSessionId } from './utils/sessionStorage';
// import { analyzeDeal, askFollowUp } from './utils/api';

// import type {
//   DealData,
//   ConversationItem
// } from './utils/types';

// export default function App() {
//   const [sessionId] = useState<string>(getSessionId);

//   const [step, setStep] = useState<'form' | 'results'>('form');

//   const [loading, setLoading] = useState<boolean>(false);

//   const [dealData, setDealData] = useState<DealData | null>(null);

//   const [analysis, setAnalysis] = useState<string | null>(null);

//   const [conversationHistory, setConversationHistory] = useState<ConversationItem[]>([]);

//   const handleFormSubmit = async (formData: DealData) => {
//     setLoading(true);
//     setDealData(formData);

//     try {
//       const result = await analyzeDeal(sessionId, formData);

//       setAnalysis(result.analysis);

//       setConversationHistory([
//         {
//           type: 'analysis',
//           content: result.analysis,
//           timestamp: new Date()
//         }
//       ]);

//       setStep('results');
//     } catch (error) {
//       const message =
//         error instanceof Error ? error.message : 'Unknown error';

//       alert('Error analyzing deal: ' + message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFollowUp = async (question: string) => {
//     setLoading(true);

//     try {
//       const result = await askFollowUp(sessionId, question);

//       setConversationHistory(prev => [
//         ...prev,
//         {
//           type: 'question',
//           content: question,
//           timestamp: new Date()
//         },
//         {
//           type: 'analysis',
//           content: result.analysis,
//           timestamp: new Date()
//         }
//       ]);

//       setAnalysis(result.analysis);
//     } catch (error) {
//       const message =
//         error instanceof Error ? error.message : 'Unknown error';

//       alert('Error with follow-up: ' + message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setStep('form');
//     setAnalysis(null);
//     setConversationHistory([]);
//     setDealData(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <header className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-2xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 💼 Sales Deal Analyzer
//               </h1>

//               <p className="text-sm text-gray-600">
//                 Powered by Claude AI
//               </p>
//             </div>

//             {step === 'results' && (
//               <button
//                 onClick={handleReset}
//                 className="text-sm px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//               >
//                 ← New Deal
//               </button>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
//         {loading && <LoadingSpinner />}

//         {!loading && step === 'form' && (
//           <DealForm onSubmit={handleFormSubmit} />
//         )}

//         {!loading && step === 'results' && dealData && (
//           <AnalysisResults
//             dealData={dealData}
//             conversationHistory={conversationHistory}
//             onFollowUp={handleFollowUp}
//             isLoading={loading}
//           />
//         )}
//       </main>
//     </div>
//   );
// }