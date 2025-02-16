import { Request, Response } from "express";
import { transactionImprovement } from "../routes/TransactionAI"; // Import AI function

export const transactionRec = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactionData = req.body; // JSON from request

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
