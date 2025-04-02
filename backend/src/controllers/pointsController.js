import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import Points from "../models/Points.js"; // Ensure correct import
import mongoose from "mongoose";

/**
 * @desc    Register a new user's points table
 * @route   POST /api/points/create
 * @access  Public
 */
export const createPointsTable = async (req, res) => {
    try {
        const { userID } = req.body; // JSON from request

        if (!userID){
            res.status(400).json({ error: "Invalid or missing userID, needed for this!" });
            return;
        }

        const points = await Points.create({
            userID: userID,
            points: 0, // Initialize points to 0
        }); 
        if (points){
            res.status(201).json({
                userID: points.userID,
                points: points.points // Points earned by the user
            });
        }
        else{
            console.error("Error creating points table:", error);
            res.status(400).json({ error: "Could not to create points table. UserID caused issues from this point onwards" });
        }
    }
    catch (error) {
        console.error("Error creating points table:", error);
        res.status(500).json({ error: "Failed to create points table" });
    }
};