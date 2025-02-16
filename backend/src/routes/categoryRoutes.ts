import express from "express";
import { generateCategory } from "../controllers/categoryController"; // Use controller logic
import { transactionRec } from "../controllers/transactionController"; // Use controller logic

const router = express.Router();

// Route to determine transaction category (via AI or manual input)
router.post("/generate-category", generateCategory);
router.post("/transaction-rec", transactionRec);

export default router;
