import express from "express";
import { createTransaction, getTransactionsByUser, bulkCreateTransactions, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

// POST Route to create a transaction
router.post("/", createTransaction);

// POST Route to create transactions by csv
router.post("/bulk", bulkCreateTransactions);

// GET Route to return all of a user's transaction
router.get("/user/:userID", getTransactionsByUser);

// DELETE Route to delete a transaction by ID
router.delete("/:transactionID", deleteTransaction);

export default router;