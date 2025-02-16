import Transaction from "../models/Transaction.js";
import { suggestCategory } from "../routes/CategoryAI.js";

export const createTransaction = async (req, res) => {
    try {
        let { amountSpent, transactionDate, location, vendor, category } = req.body;

        // If category is missing, use AI to generate one
        if (!category) {
            category = await suggestCategory(req.body);
        }

        const newTransaction = new Transaction({ amountSpent, transactionDate, location, vendor, category });
        await newTransaction.save();

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ error: "Transaction creation failed" });
    }
};
