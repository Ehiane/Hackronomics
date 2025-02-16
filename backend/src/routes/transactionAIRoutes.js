import express from "express";
import { generateAdvice } from "../controllers/transactionControllerAI.js";

const router = express.Router();

// Route to determine transaction category (via AI or manual input)
router.post("/generate-advice", generateAdvice);

export default router;