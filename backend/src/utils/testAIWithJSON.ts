const fs = require("fs");
const path = require("path");

// Define absolute path to test.json
const jsonFilePath = path.resolve(__dirname, "../../../../test.json"); 

// Read and parse JSON data
const rawData = fs.readFileSync(jsonFilePath, "utf8");
const jsonData = JSON.parse(rawData);

// Import the AI function to test
const { suggestCategory } = require("./CategoryAI");

// Function to test AI category suggestion
async function testCategoryAI() {
    try {
        console.log("Testing AI category suggestion with test.json data...");

        const result = await suggestCategory(jsonData);
        console.log("AI Suggested Category:", result);
    } catch (error) {
        console.error("Error testing AI category function:", error);
    }
}

// Run the test
testCategoryAI();

// command to run : npx ts-node backend/src/utils/testAIWithJSON.ts
