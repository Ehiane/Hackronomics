import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Avoid connecting to the real database in test environment
if (process.env.NODE_ENV !== "test") {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    // Start the Express server only if NOT in test environment
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Define routes
import userRoutes from "./routes/userRoutes.js";
// import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// Register API routes
app.use("/api/users", userRoutes);
// app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

// API status check route
app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app; // Export the app for testing
