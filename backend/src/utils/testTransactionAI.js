import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { transactionImprovement } from "../routes/TransactionAI.js"; // Adjust the path if necessary


// Convert __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define absolute path to testTransaction.json
const jsonFilePath = path.resolve(__dirname, "../../../../test.json");

// Read and parse JSON data
const rawData = fs.readFileSync(jsonFilePath, "utf8");
const testData = JSON.parse(rawData);

// Function to test AI transaction improvement
async function testTransactionAI() {
    try {
        console.log("Testing Transaction AI Improvements...\n");

        // Loop through each transaction and test AI suggestions
        for (const transaction of testData.transactions) {
            console.log(`Processing Transaction: ${transaction.transactionID}`);

            // Get AI improvement suggestions
            const improvement = await transactionImprovement(transaction);

            console.log({
                transactionID: transaction.transactionID,
                userID: transaction.userID,
                vendor: transaction.vendor,
                amountSpent: transaction.amountSpent,
                improvement: improvement
            });

            console.log("\n----------------------------------\n");
        }
    } catch (error) {
        console.error("Error testing Transaction AI function:", error);
    }
}

// Run the test
testTransactionAI();


// navigate to the src folder then run this:
//  run this: node utils/testTransactionAI.js