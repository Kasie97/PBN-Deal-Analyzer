// import { VercelRequest, VercelResponse } from "@vercel/node";

// import { analyzeDeal } from "../src/api/analyze-deal";

// export default async function handler(
//   req: VercelRequest,
//   res: VercelResponse
// ) {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://pbn-deal-analyzer.vercel.app"
//   );

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST,OPTIONS"
//   );

//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type"
//   );

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({
//       error: "Method not allowed"
//     });
//   }

//   try {
//     const result = await analyzeDeal(
//       req.body
//     );

//     return res.status(200).json(result);

//   } catch (error) {
//     console.error(
//       "Analyze deal error:",
//       error
//     );

//     return res.status(500).json({
//       success:false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "Internal server error"
//     });
//   }
// }


// // import { VercelRequest, VercelResponse } from "@vercel/node";

// // import { analyzeDeal } from "../src/api/analyze-deal.ts";

// // export default async function handler(
// //   req: VercelRequest,
// //   res: VercelResponse
// // ) {
// //   res.setHeader("Access-Control-Allow-Origin", "*");

// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET, POST, OPTIONS"
// //   );

// //   res.setHeader(
// //     "Access-Control-Allow-Headers",
// //     "Content-Type"
// //   );

// //   if (req.method === "OPTIONS") {
// //     return res.status(200).end();
// //   }

// //   if (req.method === "POST") {
// //     try {
// //       const result = await analyzeDeal(req.body);

// //       return res.status(200).json(result);
// //     } catch (error) {
// //       console.error(error);

// //       return res.status(500).json({
// //         success: false,
// //         error:
// //           error instanceof Error
// //             ? error.message
// //             : "Internal server error"
// //       });
// //     }
// //   }

// //   return res.status(404).json({
// //     error: "Not found"
// //   });
// // }