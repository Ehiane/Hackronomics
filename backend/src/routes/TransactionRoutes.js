import express from "express";
import { addTransaction, getTransaction, getTransactions, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

// Route to add a new transaction
router.post("/addTransaction", addTransaction);

// Route to get all transactions (protected)
router.get("/getTransactions", getTransactions);

// Route to get a specific transaction (protected)
router.get("/:transactionID", getTransaction);

// Route to delete a user (admin-only)
router.delete("/:transactionID", deleteTransaction);

export default router;
