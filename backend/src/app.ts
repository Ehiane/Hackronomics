import express from "express"; // Import Express framework
import cors from "cors"; // Import CORS for cross-origin requests
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import connectDB from "./config/mongoConnect"; // Import MongoDB connection function
// import userRoutes from "./routes/userRoutes"; // Import user routes
import categoryRoutes from "./routes/categoryRoutes"; // Import the category routes

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Set default port

connectDB(); // Connect to MongoDB

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

// Define API Routes
// app.use("/api/users", userRoutes); // Use user routes under /api/users
app.use("/api/ai-category", categoryRoutes); // Use category routes under /api

// Default route
app.get("/", (req, res) => {
    res.send("Hacronomics Backend is Running!"); // Default response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

