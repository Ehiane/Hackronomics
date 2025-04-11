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

        if (!userID || !mongoose.Types.ObjectId.isValid(userID)){
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
            res.status(400).json({ error: "Could not create points table. UserID caused issues from this point onwards" });
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
  const { userID } = req.params; // Extract userID from request parameters
  if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ error: "Invalid or missing userID" });
  }

  try {
    // console.log(`Fetching points for userID: ${userID}`);
    const points = await Points.findOne({ userID }).select("points"); // Fetch points for the user
    // console.log("Points fetched:", points);

    if (points) {
      res.status(200).json(points.points); // Return points
    //   console.log("Points fetched successfully:", points.points);
    } else {
      res.status(404).json({ error: "Points table not found" });
      console.log("Points table not found for userID:", userID);
    }
  } catch (error) {
    console.error("Error retrieving points:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc Update points table's points for a user based on userID
 * @route POST /api/points/update/:userID&:points
 * @access Public
 */
export const updatePoints = async (req, res) => {
    const {userID, points } = req.params; // Extract userID and points from request parameters
    try {
        console.log(`Updating points for userID: ${userID}`);
        const pointsReceived = await Points.findOne({ userID });
        if (pointsReceived) {
            pointsReceived.points = Number(pointsReceived); // Update points
            await pointsReceived.save(); // Save the updated points table
            res.status(200).json(pointsReceived);
        } else {
            res.status(404).json({ error: "Points table not found" });
        }
    }
    catch (error){
        console.error("Error updating points:", error);
        res.status(500).json({ message: "Server error", error });   
    }
}