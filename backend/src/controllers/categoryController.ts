import { Request, Response } from "express";
import { suggestCategory } from "../utils/CategoryAI"; // Import AI function

export const generateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactionData = req.body; // JSON from request

        if (!transactionData) {
            res.status(400).json({ error: "Invalid or missing transaction data" });
            return;
        }

        // Use AI only if category is missing
        const category = await suggestCategory(transactionData);

        res.status(200).json({ category });
    } catch (error) {
        console.error("Error generating category:", error);
        res.status(500).json({ error: "Failed to generate category" });
    }
};
