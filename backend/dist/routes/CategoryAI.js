"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestCategory = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to manage environment variables
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
// console.log(process.env.OPEN_API_KEY);
console.log("Loaded API Key:", process.env.OPEN_API_KEY);
const openai = new openai_1.default({ apiKey: process.env.OPEN_API_KEY });
const suggestCategory = (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    `;
    try {
        console.log(`AI Processing Transaction: ${transactionData.transactionID}`);
        const response = yield openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }, { role: "user", content: JSON.stringify(transactionData) }],
        });
        // Extract and clean the AI's response to get the category.
        const category = ((_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.trim()) || "Miscellaneous Expenses";
        console.log(`AI Category for ${transactionData.transactionID}: ${category}`);
        // Return the suggested category from AI.
        return category;
    }
    catch (error) {
        console.error("AI Category Suggestion Error:", error);
        return "Miscellaneous Expenses"; // Default fallback
    }
});
exports.suggestCategory = suggestCategory;
