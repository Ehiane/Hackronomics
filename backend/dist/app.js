"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import Express framework
const cors_1 = __importDefault(require("cors")); // Import CORS for cross-origin requests
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to manage environment variables
const mongoConnect_1 = __importDefault(require("./config/mongoConnect")); // Import MongoDB connection function
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes")); // Import the category routes
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)(); // Initialize Express app
const PORT = process.env.PORT || 5000; // Set default port
(0, mongoConnect_1.default)(); // Connect to MongoDB
// Middleware
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express_1.default.json()); // Parse incoming JSON requests
// Define API Routes
app.use("/api/ai-category", categoryRoutes_1.default); // Use category routes under /api
app.use("/api/users", userRoutes_1.default); // Use user routes under /api/users
// Default route
app.get("/", (req, res) => {
    res.send("Hacronomics Backend is Running!"); // Default response
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
