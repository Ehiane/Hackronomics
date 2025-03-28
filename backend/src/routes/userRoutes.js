import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, logoutUser } from "../controllers/userController.js";

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

router.post("/logout", logoutUser); // Is it necessary?

export default router;
