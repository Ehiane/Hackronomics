import OpenAI from "openai";
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import path from "path";
import { fileURLToPath } from "url";

// Convert __dirname for ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });


const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export const suggestCategory = async (transactionData) => {
    console.log("Transaction Data:", transactionData);
    // If category is already provided, return it unchanged
    if (transactionData.category) {
        return transactionData.category;
    }

    if (transactionData.aiCategory === "false" || transactionData.aiCategory === false) {
        return "";
    }

    const prompt = `
    You are an AI specializing in financial transaction analysis. Your task is to categorize a transaction based on the provided details.

    Transaction Details:
    - transactionID: {transactionID}
    - userID: {userID}
    - amountSpent: {amountSpent}
    - transactionDate: {transactionDate}
    - location: {
        - city: {city}
        - state: {state}
        - zipcode: {zipcode}
    }
    - vendor: {vendor}
    - category: {category} // VERY LIKELY WILL BE EMPTY
    - aiCategory: ""

    Expected Output:
    If the category is empty, determine a precise category that best matches the transaction, then insert that category in place of the blank string. If a string is inserted, mark the aiCategory blank string with true, if not mark it with false. Do NOT use a broad or vague category like "Other." If the transaction does not clearly fit one of the primary categories, provide a reasonable alternative based on the merchant type or transaction description. The output should be a json string.

    You must return only one category name from the following refined options:
    - Fast Food
    - Restaurant & Dining
    - Groceries
    - Public Transport
    - Rideshare & Taxis
    - Fuel & Gas
    - Entertainment & Events
    - Streaming & Subscriptions
    - Clothing & Accessories
    - Electronics & Gadgets
    - Healthcare & Medical
    - Fitness & Wellness
    - Utilities & Bills
    - Education & Learning
    - Home & Furniture
    - Gifts & Donations
    - Miscellaneous Expenses (only if absolutely necessary)

    Important Rules:
    - Always pick the most relevant category based on transaction details.
    - Avoid broad categories—be as specific as possible.
    - If a category does not fit exactly, match it to a closely related category.
    - Return only the category name with no extra text.
    - Put true in aiCategory if a category is suggested, false if not in the aiCategory field.
    - Put the assigned category in the category field.
    `;

    try {
        console.log(`AI Processing Transaction: ${transactionData.transactionID}`);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }, { role: "user", content: JSON.stringify(transactionData) }],
        });

        // Extract and clean the AI's response to get the category.
        const category = response.choices[0].message.content?.trim() || "Miscellaneous Expenses";

        console.log(`AI Category for ${transactionData.transactionID}: ${category}`);

        // Return the suggested category from AI.
        return category;

    } catch (error) {
        console.error("AI Category Suggestion Error:", error);
        return "Miscellaneous Expenses"; // Default fallback
    }
};
