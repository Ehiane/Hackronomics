import Transaction from "../models/Transaction.js";
import { transactionImprovement } from "../routes/TransactionAI.js"; // Import AI function

export const generateAdvice = async (req, res) => {
    try {
        const transactionData = req.body; // JSON from request

        console.log(transactionData);

        if (!transactionData) {
            res.status(400).json({ error: "Invalid or missing transaction data" });
            return;
        }

        // Use AI only if category is missing
        const transaction = await transactionImprovement(transactionData);

        res.status(200).json({ transaction });
    } catch (error) {
        console.error("Error generating transaction:", error);
        res.status(500).json({ error: "Failed to generate transaction advice" });
    }
};
