import OpenAI from "openai";
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// console.log(process.env.OPEN_API_KEY);
console.log("Loaded API Key:", process.env.OPEN_API_KEY);


const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export const suggestCategory = async (transactionData: any): Promise<string> => {
    // If category is already provided, return it unchanged
    if (transactionData.category) {
        return transactionData.category;
    }

    if (transactionData.aiCategory === "false" || transactionData.aiCategory === false){

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
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }, { role: "user", content: JSON.stringify(transactionData) }],
        });

        return response.choices[0].message.content?.trim() || "Miscellaneous Expenses";
    } catch (error) {
        console.error("AI Category Suggestion Error:", error);
        return "Miscellaneous Expenses"; // Default fallback
    }
};
