import express from "express";
import { createTransaction } from "../controllers/transactionController.js";

const router = express.Router();

// Route to determine transaction category (via AI or manual input)
router.post("/transaction-rec", createTransaction);

export default router;
