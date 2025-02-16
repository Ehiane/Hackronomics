import express from "express";
import { generateCategory } from "../controllers/categoryController.js";
import { transactionRec } from "../controllers/transactionController.js";

const router = express.Router();

// Route to determine transaction category (via AI or manual input)
router.post("/generate-category", generateCategory);
router.post("/transaction-rec", transactionRec);

export default router;
