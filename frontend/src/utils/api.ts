import axios from 'axios';

import type {
  DealData,
  AnalyzeResponse
} from './types';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,

  timeout: 45000,

  headers: {
    'Content-Type':
      'application/json'
  }
});

export async function analyzeDeal(
  sessionId: string,
  dealData: DealData
): Promise<AnalyzeResponse> {
  try {
    const response =
      await api.post<AnalyzeResponse>(
        '/analyze-deal',
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

  } catch (error: unknown) {
    console.error(
      'Analyze Deal Error:',
      error
    );

    const message =
      axios.isAxiosError(error)
        ? error.response?.data?.error ||
          error.message
        : 'Failed to analyze deal';

    const err = new Error(message);

    // preserve original error manually
    (err as Error & { originalError?: unknown })
      .originalError = error;

    throw err;
  }
}

export async function askFollowUp(
  sessionId: string,
  followUpQuestion: string
): Promise<AnalyzeResponse> {
  try {
    const response =
      await api.post<AnalyzeResponse>(
        '/analyze-deal',
        {
          sessionId,
          followUpQuestion
        }
      );

    return response.data;

  } catch (error: unknown) {
    console.error(
      'Follow-up Error:',
      error
    );

    const message =
      axios.isAxiosError(error)
        ? error.response?.data?.error ||
          error.message
        : 'Follow-up failed';

    const err = new Error(message);

    (err as Error & { originalError?: unknown })
      .originalError = error;

    throw err;
  }
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