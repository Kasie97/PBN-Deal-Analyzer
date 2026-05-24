import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { analyzeDeal } from "./api/analyze-deal.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://pbn-deal-analyzer.vercel.app'
    ],
    credentials: true
}));
app.use(express.json({
    limit: "250kb"
}));
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: "Too many requests"
});
app.post("/api/analyze-deal", limiter, async (req, res) => {
    try {
        const result = await analyzeDeal(req.body);
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error
                ? error.message
                : "Internal server error"
        });
    }
});
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
});
app.use((_req, res) => {
    res.status(404).json({
        error: "Not found"
    });
});
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({
        error: "Internal server error"
    });
});
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
