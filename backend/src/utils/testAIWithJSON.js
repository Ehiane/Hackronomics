const fs = require("fs");
const path = require("path");

// Define absolute path to test.json
const jsonFilePath = path.resolve(__dirname, "../../../../test.json");

// Read and parse JSON data
const rawData = fs.readFileSync(jsonFilePath, "utf8");
const testData = JSON.parse(rawData);

// Import the AI function to test
const { suggestCategory } = require("../routes/CategoryAI");

function extractAiCategory(aiCategoryData) {
    try {
        // If it is a JSON-like string, parse it
        if (typeof aiCategoryData === "string" && aiCategoryData.startsWith("{") && aiCategoryData.endsWith("}")) {
            const parsed = JSON.parse(aiCategoryData); // Convert string to object
            return parsed.aiCategory || "Unknown"; // Extract aiCategory if available
        }
        return aiCategoryData; // Otherwise, it's already a valid string
    } catch (error) {
        return "Parsing Error"; // Handle JSON parsing error
    }
}

// Function to test AI category suggestion
async function testCategoryAI() {
    try {
        console.log("Testing AI category suggestion with test.json data...\n");

        // Loop through each transaction and test AI category
        for (const transaction of testData.transactions) {
            const result = await suggestCategory(transaction);

            // Ensure result is an object and extract only the necessary fields
            let aiCategory = extractAiCategory(result);

            // ✅ Print only relevant fields
            console.log({
                transactionID: transaction.transactionID,
                userID: transaction.userID,
                accountName: testData.accountName, // Assuming accountName is at the root
                aiCategory: aiCategory
            });
        }
    } catch (error) {
        console.error("Error testing AI category function:", error);
    }
}

// Run the test
testCategoryAI();
