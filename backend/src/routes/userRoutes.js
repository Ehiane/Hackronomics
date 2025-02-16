import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure correct import

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

// Route to get the logged-in user's profile (protected)
router.get("/:userID", getUserProfile);

// Route to update the logged-in user's profile (protected)
router.put("/:userID", updateUserProfile);

// Route to delete a user (admin-only)
router.delete("/:userID",deleteUser);

export default router;
