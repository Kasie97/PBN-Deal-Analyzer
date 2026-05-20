import axios from 'axios';

import type {
  DealData,
  AnalyzeResponse
} from './types';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000
});

export async function analyzeDeal(
  sessionId: string,
  dealData: DealData
): Promise<AnalyzeResponse> {
  const response =
    await api.post<AnalyzeResponse>(
      '/api/analyze-deal',
      {
        sessionId,
        dealData: {
          ...dealData,
          dealSize: Number(
            dealData.dealSize
          )
        }
      }
    );

  return response.data;
}

export async function askFollowUp(
  sessionId: string,
  followUpQuestion: string
): Promise<AnalyzeResponse> {
  const response =
    await api.post<AnalyzeResponse>(
      '/api/analyze-deal',
      {
        sessionId,
        followUpQuestion
      }
    );

  return response.data;
}



// import axios from 'axios';

// import type {
//   DealData,
//   AnalyzeResponse
// } from './types';

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL ||
//   'http://localhost:3001';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000
// });

// export async function analyzeDeal(
//   sessionId: string,
//   dealData: DealData
// ): Promise<AnalyzeResponse> {
//   try {
//     const response = await api.post<AnalyzeResponse>(
//       '/api/analyze-deal',
//       {
//         sessionId,
//         dealData
//       }
//     );

//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.error ||
//           error.message
//       );
//     }

//     throw new Error('Failed to analyze deal');
//   }
// }

// export async function askFollowUp(
//   sessionId: string,
//   followUpQuestion: string
// ): Promise<AnalyzeResponse> {
//   try {
//     const response = await api.post<AnalyzeResponse>(
//       '/api/analyze-deal',
//       {
//         sessionId,
//         followUpQuestion
//       }
//     );

//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.error ||
//           error.message
//       );
//     }

//     throw new Error('Failed to get response');
//   }
// }