import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export const suggestCategory = async (transactionData: any): Promise<string> => {
    // If category is already provided, return it unchanged
    if (transactionData.category) {
        return transactionData.category;
    }

    const prompt = `
    **Expected Output:**
    - Determine the most precise category for the transaction if category is missing.
    - Avoid using "Other" unless absolutely necessary.
    
    **Categories:**
    - Fast Food, Groceries, Public Transport, Streaming & Subscriptions, etc.

    **Rules:**
    - Be as specific as possible.
    - Return only a string with the category name.
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
