import { error } from "console";
import Transaction from "../models/Transaction.js";
import { transactionImprovement } from "../routes/TransactionAI.js"; // Import AI function
import { suggestCategory} from "../routes/CategoryAI.js"

export const createTransaction = async (req, res) => {
    try {
        const transactionData = req.body; // JSON from request

        if (!transactionData) {
            res.status(400).json({ error: "Invalid or missing transaction data" });
            return;
        }

        // // Use AI only if category is missing
        if (transactionData.category == null)
        {
            // const improvedData = await transactionImprovement(transactionData);
            const AI_Suggested_Category = await suggestCategory(transactionData);
            // Parse the string into a JS object if needed
            const parsedCategory = typeof AI_Suggested_Category === "string"
            ? JSON.parse(AI_Suggested_Category)
            : AI_Suggested_Category;

            transactionData.category = `[AI]: ${parsedCategory.aiCategory}`;
            console.log("AI suggested: ", transactionData.category);
        }


        const newTransaction = new Transaction(transactionData);
        await newTransaction.save();

        res.status(201).json({ newTransaction });
    } catch (error) {
        console.error("Error generating transaction:", error);
        res.status(500).json({ error: "Failed to generate transaction record" });
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

export const bulkCreateTransactions = async (req, res) => {
    try {
        const transactions = req.body; // assume array of parsed transactions
        if (!Array.isArray(transactions)) {
            return res.status(400).json({ error: "Expected an array of transactions" });
        }

        // validate each item (or use a schema validator)
        const invalidItems = transactions.filter(tx => {
            return (
            !tx.transactionID ||
            typeof tx.amountSpent !== "number" ||
            !tx.transactionType ||
            !tx.transactionDate ||
            !tx.description ||
            !tx.category ||
            !tx.userID ||
            !tx.Location ||
            !tx.Location.city ||
            !tx.Location.state ||
            !tx.Location.zipcode
            );
        });
    
        if (invalidItems.length > 0) {
            return res.status(400).json({ error: "Some transactions are invalid", invalidItems });
        }
        const created = await Transaction.insertMany(transactions);
        res.status(201).json({ message: "Transactions added", count: created.length });
    } catch (err) {
        console.error("Bulk upload failed", err);
        res.status(500).json({ error: "Bulk upload failed" });
    }
};
