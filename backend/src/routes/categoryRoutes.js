import express from "express";
import { generateCategory } from "../controllers/categoryController.js";

const router = express.Router();

// Route to determine transaction category (via AI or manual input)
router.post("/generate-category", generateCategory);

export default router;
