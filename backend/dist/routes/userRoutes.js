"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // ✅ Ensure correct import
const router = express_1.default.Router();
// Route to register a new user
router.post("/register", userController_1.registerUser);
// Route to log in a user
router.post("/login", userController_1.loginUser);
// Route to get the logged-in user's profile (protected)
router.get("/profile", authMiddleware_1.protect, userController_1.getUserProfile);
// Route to update the logged-in user's profile (protected)
router.put("/update", authMiddleware_1.protect, userController_1.updateUserProfile);
// Route to delete a user (admin-only)
router.delete("/delete/:id", authMiddleware_1.protect, userController_1.deleteUser);
exports.default = router;
