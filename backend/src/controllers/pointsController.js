import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import Points from "../models/Points.js"; // Ensure correct import
import mongoose from "mongoose";

/**
 * @desc    Register a new user's points table
 * @route   POST /api/points-create
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

/**
 * @desc Get points for a user based on userID
 * @route POST /api/points-get/:pointsUserID
 * @access Public
 */
export const getPoints = async (req, res) => {
    const { userID, point } = req.body;
    
    try {
        console.log(`Fetching points for userID: ${userID}`);
        const points = await Points.findOne({ userID: userID });
        
        if (points) {
            res.status(200).json(points);
        } else {
            res.status(404).json({ error: "Points table not found" });
        }
    }
    catch (error) {
        console.error("Error retrieving points:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

/**
 * @desc Update points table's points for a user based on userID
 * @route POST /api/points/update/:userID&:points
 * @access Public
 */
export const updatePoints = async (req, res) => {
    const usID = req.params.one;
    const point = req.params.two;
    try {
        console.log(`Getting points for userID: ${usID}`);
        const points = await Points.findOne({ userID: usID });
        if (points) {
            points.points = point; // Update points
            await points.save(); // Save the updated points table
            res.status(200).json(points);
        } else {
            res.status(404).json({ error: "Points table not found" });
        }
    }
    catch (error){

    }
}