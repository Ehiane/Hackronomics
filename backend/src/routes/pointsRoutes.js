import express from "express";
import { createPointsTable, getPoints, updatePoints } from "../controllers/pointsController.js"; // Ensure correct import

const router = express.Router();

// Route to create points table for a user
router.post("/points-create", createPointsTable); 

// Route to get the user's points
router.get("/get/:userID", getPoints);

// Route to update the user's points
router.put("/update/:userID/:points", updatePoints)


export default router;