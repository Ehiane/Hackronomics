import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import Transaction from "../models/Transaction.js"; // Ensure correct import
import mongoose from "mongoose";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * @desc    Add a new transaction
 * @route   POST /api/transactions/addTransaction
 * @access  Public
 */
export const addTransaction = async (req, res) => {
    try {
        const { transactionID, userID, amountSpent, transactionType, transactionDate, Location, description, merchantName, merchantType, category } = req.body;

        // Check if transaction already exists
        const transactionExists = await Transaction.findOne({ transactionID });
        if (transactionExists) {
            return res.status(400).json({ message: "Transaction already exists" });
        }

        // Create new transaction
        const transaction = await Transaction.create({
            transactionID,
            userID,
            amountSpent,
            transactionType,
            transactionDate,
            Location,
            description,
            merchantName,
            merchantType,
            category,
        });

        if (transaction) {
            console.log("Valid transaction data");
            res.status(201).json({
                _id: transaction.transactionID,
                userID: transaction.userID,
                amountSpent: transaction.amountSpent,
                transactionType: transaction.transactionType,
                transactionDate: transaction.transactionDate,
                Location: transaction.Location,
                category: transaction.category,
                token: generateToken(transaction.transactionID)
            });
        } else {
            console.log("Invalid transaction data");
            res.status(400).json({ message: "Invalid transaction data" });
        }
    } catch (error) {
        console.error("Error in addTransaction:", error); 
        res.status(500).json({ message: "Server error", error });
    }
};

// Get transaction function
export const getTransaction = async (req, res) => {
    const { transactionID } = req.body;

    try {
        const transaction = await Transaction.filter({ transactionID });

        if (transaction && (transaction.transactionID == transactionID)) {
            res.json({
                _id: transaction.transactionID,
                userID: transaction.userID,
                amountSpent: transaction.amountSpent,
                transactionType: transaction.transactionType,
                transactionDate: transaction.transactionDate,
                Location: transaction.Location,
                category: transaction.category,
                token: generateToken(transaction.transactionID)
            });
        } else {
            res.status(401).json({ message: "Invalid transactionID" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get transactions function
export const getTransactions = async (req, res) => {
    const { transactionID } = req.body;

    try {
        const transactions = await Transaction.findOne({ transactionID });

        if (transactions && transactions.length > 0) {
            res.json({
                transactions: transactions,
                token: generateToken(transactions[0].userID)
            });
        } else {
            res.status(401).json({ message: "Invalid transactionID" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * @desc    Delete a transaction by transactionID
 * @route   DELETE /api/transactions/:transactionID
 * @access  Public
 */
export const deleteTransaction = async (req, res) => {
    try {
        console.log(`Attempting to delete transaction with ID: ${req.params.transactionID}`);

        const transaction = await Transaction.findOne({ transactionID: req.params.transactionID });

        if (!transaction) {
            console.warn(`Transaction not found for deletion: ${req.params.transactionID}`);
            return res.status(404).json({ message: "Transaction not found" });
        }

        await transaction.deleteOne();
        console.log(`Transaction deleted successfully: ${transaction.transactionID}`);

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTransactionByID:", error);
        res.status(500).json({ message: "Server error", error });
    }
};