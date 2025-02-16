import express, { Request, Response } from "express";
import multer from "multer";
import OpenAI from "openai";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const transactionCategorizationPrompt: string = `
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

/* /generate-category: takes a json file, converts it to text for AI/ML handling,
    then sends a prompt to OpenAI api and returns the response */
router.post("/generate-category", upload.single("inputFile"), (request: Request, response: Response): void => {
    try {
        /* null file check */
        if (!request.file) {
            response.status(400).json({error: "no file uploaded"});
            return;
        }
        
        /* parse the json file */
        const jsonData = JSON.parse(request.file.buffer.toString("utf-8"));
        console.log("parsed data:", jsonData);
  
        openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role: "system", content: transactionCategorizationPrompt},
                {role: "user", content: JSON.stringify(jsonData)}
            ],
        })
        .then(completion => {
            response.json({response: completion.choices[0].message.content});
        })
        .catch(error => {
            /* error handling */
            console.error("error (/generate-category):", error);
            response.status(500).json({error: "could not generate response"});
        });
    } catch (error) {
        /* error handling */
        console.error("error (/generate-category):", error);
        response.status(500).json({error: "file could not be parsed" });
    }
});

export default router;
