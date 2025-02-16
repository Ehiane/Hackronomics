import OpenAI from "openai";
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import axios from "axios";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getUserCoordinates = async (): Promise<{ latitude: number; longitude: number } | null> => {
    try {
        const response = await axios.get("https://ipinfo.io/json", {
            params: { token: process.env.IPINFO_API_KEY }
        });

        if (response.data.loc) {
            const [latitude, longitude] = response.data.loc.split(",").map(Number);
            console.log(`user location: ${latitude}, ${longitude}`);
            return { latitude, longitude };
        }
    } catch (error) {
        console.error("error:", error);
    }
    return null;
};

const getLocation = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                latlng: `${latitude},${longitude}`,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.results.length > 0) {
            let city = "";
            let state = "";

            for (const component of response.data.results[0].address_components) {
                if (component.types.includes("locality")) {
                    city = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                    state = component.short_name;
                }
            }

            return city && state ? `${city}, ${state}` : null;
        }
    } catch (error) {
        console.error("error:", error);
    }
    return null;
};

export const transactionImprovement = async (transactionData: any): Promise<string> => {
    let userLocation = "null";

    // Fetch user's approximate location
    const coordinates = await getUserCoordinates();
    if (coordinates) {
        const locationDetails = await getLocation(coordinates.latitude, coordinates.longitude);
        userLocation = locationDetails ? locationDetails : "null";
    }

    console.log(`User Location: ${userLocation}`);

    const prompt = `
    You are an AI specializing in financial transaction analysis. Your task is to provide financial advice on ways to budget money more efficiently based on input.

    Transaction Details:
    - transactionID: {transactionID}
    - userID: {userID}
    - amountSpent: {amountSpent}
    - transactionDate: {transactionDate}
    - vendor: {vendor}
    - category: {category}

    Additional Context for Better Analysis:
    - Users Monthly Income: {monthlyIncome}
    - Users Monthly Expenses (Fixed & Variable): {monthlyFixedExpenses}, {monthlyVariableExpenses}
    - Savings Goal (Short-Term & Long-Term): {shortTermGoal}, {longTermGoal}
    - Debt Obligations (if any): {debtObligations}
    - Spending Trends (past 3 months): {spendingTrends}
    - Subscription Services & Recurring Payments: {subscriptions}
    - Cash Flow (Income - Expenses): {cashFlow}
    - Financial Priorities (e.g., saving for a house, reducing debt, investing more): {financialPriorities}

    Expected Output:
    - The response must be plain text, a string that can be handled and printed pretty with typescript.
    - A concise introduction summarizing the users spending behavior based on the transaction.
    - Add several Bullet-point recommendations on how to improve financial habits, including:
    - Ways to cut unnecessary spending.
    - Suggestions for reallocating funds towards savings or investments.
    - Strategies to optimize recurring expenses.
    - Debt reduction strategies (if applicable).
    - Any custom insights based on spending trends.
    - Number the bullet points.
    - Provide the user with cheaper alternatives if available based on their location: ${userLocation}.
    - Do NOT add next lines or "**"!!!›
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }, { role: "user", content: JSON.stringify(transactionData) }],
        });

        return response.choices[0].message.content?.trim() || "";
    } catch (error) {
        console.error("AI Savings Recommendation:", error);
        return "Miscellaneous Expenses"; // Default fallback
    }
};
