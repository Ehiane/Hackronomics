import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserItemList from "../models/UserItemList.js"; // Ensure correct import
import { createOrGetUserItemList } from "../utils/userItemListUtils.js"; // Ensure correct import

/** 
 * @desc Register a new user item list to add to the user item list collection
 * @route POST /api/userItemList/register/:userID
 * @access Public
 */
export const registerUserItemList = async (req, res) => {
    const { userID } = req.params; // Extract userID from request parameters
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ error: "Invalid or missing userID" });
    }
    try {
        const userItemList = await createUserItemList(userID, itemList); // Create user item list for the user
        return res.status(201).json({
            userID: userItemList.userID, 
            itemList: userItemList.itemList,
        });
    }
    catch (error){
        console.error("Error registering user item list:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * * @desc Get user item list for a user based on userID
 * * @route GET /api/userItemList/get/:userID
 * * @access Public
 */

export const getUserItemList = async (req, res) => {
    const {userID} = req.params; // Extract userID from request parameters
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ error: "Invalid or missing userID" });
    }
    try {
        const userItemList = await createOrGetUserItemList(userID); // Fetch user item list for the user
        return res.status(200).json({
            userID: userItemList.userID,
            itemList: userItemList.itemList,
        });
    }
    catch (error) {
        console.error("Error retrieving user item list:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

/**
 * 
 * @desc Adds an item to the user item list
 * @route POST /api/userItemList/add/:userID&:itemID
 * @access Public
 */
export const addToUserItemList = async (req, res) => {
    const { userID, itemID } = req.params; // Extract userID and itemID from request parameters
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ error: "Invalid or missing userID" });
    }
    if (!itemID || !mongoose.Types.ObjectId.isValid(itemID)) {
        return res.status(400).json({ error: "Invalid or missing itemID" });
    }
    try {
        const userItemList = await createOrGetUserItemList(userID); // Fetch user item list for the user
        userItemList.itemList.push(itemID); // Add item to the user's item list
        await userItemList.save(); // Save the updated item list
        return res.status(200).json({
            userID: userItemList.userID,
            itemList: userItemList.itemList,
        });
    }
    catch (error) {
        console.error("Error adding to user item list:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

/**
 * 
 * @desc Removes an item from the user item list
 * @route POST /api/userItemList/remove/:userID&:itemID
 * @access Public
 */
export const removeFromUserItemList = async (req, res) => {
    const { userID, itemID } = req.params; // Extract userID and itemID from request parameters
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ error: "Invalid or missing userID" });
    }
    if (!itemID || !mongoose.Types.ObjectId.isValid(itemID)) {
        return res.status(400).json({ error: "Invalid or missing itemID" });
    }
    try {
        const userItemList = await createOrGetUserItemList(userID); // Fetch user item list for the user
        userItemList.itemList = userItemList.itemList.filter(item => item !== itemID); // Remove item from the user's item list
        await userItemList.save(); // Save the updated item list
        return res.status(200).json({
            userID: userItemList.userID,
            itemList: userItemList.itemList,
        });
    }
    catch (error) {
        console.error("Error removing from user item list:", error);
        res.status(500).json({ message: "Server error", error });
    }
}