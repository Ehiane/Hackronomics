import { error } from "console";
import Transaction from "../models/Transaction.js";
import { transactionImprovement } from "../routes/TransactionAI.js"; // Import AI function
import { suggestCategory} from "../routes/CategoryAI.js"

export const createTransaction = async (req, res) => {
    try {
        const transactionData = req.body; // JSON from request

        console.log("Transaction data received: ", transactionData);
        if (!transactionData) {
            res.status(400).json({ error: "Invalid or missing transaction data" });
            return;
        }

        // // Use AI only if category is missing
        if (transactionData.category === null|| transactionData.category === "")
        {
            // const improvedData = await transactionImprovement(transactionData);
            const AI_Suggested_Category = await suggestCategory(transactionData);
            // Parse the string into a JS object if needed
            const parsedCategory = typeof AI_Suggested_Category === "string"
            ? JSON.parse(AI_Suggested_Category)
            : AI_Suggested_Category;

            // some times it will return both aiCategory and category, so we need to check if it is empty or not
            if (parsedCategory.category !== "" || parsedCategory.category !== null) {
                transactionData.category = parsedCategory.category;
            }
            else
            {
                transactionData.category = parsedCategory.aiCategory;
            }

            // Log the AI suggested category for debugging
            console.log("AI suggested category: ", parsedCategory.category);
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
        const { transactions } = req.body; // Extract the transactions array from the object
        console.log("Bulk transactions data received: ", transactions, typeof transactions);
        
        if (!Array.isArray(transactions)) {
            return res.status(400).json({ error: "Expected transactions to be an array" });
        }

        // Validate each item (or use a schema validator)
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
        res.status(201).json({ message: "Transactions added", count: created.length, transactions: created });
    } catch (err) {

        // Handle Mongo duplicate key error
        if (err.code === 11000 || err.writeErrors) {
            const duplicates = err.writeErrors?.map(e => ({
                index: e.index,
                transactionID: e.err?.op?.transactionID,
                message: e.err?.errmsg
            }));

            
    
            return res.status(409).json({
                error: "Duplicate transactionID(s) found",
                duplicates
            });
        }

        console.error("Bulk upload failed", err);
        res.status(500).json({ error: "Bulk upload failed" });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { transactionID } = req.params;
        if (!transactionID) {
            return res.status(400).json({ error: "Transaction ID is required" });
        }

        const deletedTransaction = await Transaction.findOneAndDelete({ transactionID });
        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully", deletedTransaction });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ error: "Failed to delete transaction" });
    }
}