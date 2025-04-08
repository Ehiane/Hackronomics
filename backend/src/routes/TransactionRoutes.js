import express from "express";
import { createTransaction, getTransactionsByUser } from "../controllers/transactionController.js";

const router = express.Router();

// POST Route to create a transaction
router.post("/", createTransaction);

// GET Route to return all of a user's transaction
router.get("/user/:userID", getTransactionsByUser);

export default router;