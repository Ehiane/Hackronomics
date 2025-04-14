import express from "express";
import { createTransaction, getTransactionsByUser, bulkCreateTransactions } from "../controllers/transactionController.js";

const router = express.Router();

// POST Route to create a transaction
router.post("/", createTransaction);

router.post("/bulk", bulkCreateTransactions);

// GET Route to return all of a user's transaction
router.get("/user/:userID", getTransactionsByUser);

export default router;