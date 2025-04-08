import { error } from "console";
import Transaction from "../models/Transaction.js";
import { transactionImprovement } from "../routes/TransactionAI.js"; // Import AI function

export const createTransaction = async (req, res) => {
    try {
        const transactionData = req.body; // JSON from request

        if (!transactionData) {
            res.status(400).json({ error: "Invalid or missing transaction data" });
            return;
        }

        // Use AI only if category is missing
        if (!transactionData.category)
        {
            const improvedData = await transactionImprovement(transactionData);
            Object.assign(transactionData, improvedData); // merge AI-suggested fields
        }

        const newTransaction = new Transaction(transactionData);
        await newTransaction.save();

        res.status(201).json({ newTransaction });
    } catch (error) {
        console.error("Error generating transaction:", error);
        res.status(500).json({ error: "Failed to generate transaction advice" });
    }
};


export const getTransactionsByUser = async (req, res) => {
    try {
        console.log(req.params);
        const {userID} = req.params;
        
        if (!userID) {
            return res.status(400).json({error: "User ID is required"});
        }

        const transactions = await Transaction.find({userID}).sort({transactionDate: -1});
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({error: "Failed to retrieve transactions"});
    }
}