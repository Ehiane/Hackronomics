import Item from "../models/Items.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/** 
 * @desc Register a new item to add to the item collection
 * @route POST /api/items/register
 * @access Public
 */
export const registerItem = async (req, res) => {
    try {
        const { name, category, imageURL, price } = req.body; // JSON from request

        const item = await Item.create({
            itemID: new mongoose.Types.ObjectId(), // Generate a new ObjectId for itemID
            name,
            category,
            imageURL,
            price,
        });
        if (item){
            console.log("Valid item data");
            return res.status(201).json({
            itemID: item.itemID, 
            name: item.name,
            category: item.category,
            imageURL: item.imageURL,
            price: item.price,
        });
        }
        else{
            console.log("Invalid item data");
            return res.status(400).json({ message: "Invalid item data" });
        }
        
    }
    catch (error) {
        console.error("Error registering item:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

/**
 * 
 * @desc Get an item from the item collection based on itemID
 * @route GET /api/items/get/:itemID 
 * @access Public
 */
export const getItem = async (req, res) => {
    const { itemID } = req.params; // Extract userID from request parameters
    if (!itemID || !mongoose.Types.ObjectId.isValid(itemID)) {
        return res.status(400).json({ error: "Invalid or missing userID" });
    }

    try {
        console.log("Fetching item of ID: ", itemID);
        const foundItem = await Item.findOne({ itemID }); // Fetch an item by the itemID
        if (foundItem) {
            console.log("Valid item data");
            return res.status(200).json({
                itemID: foundItem.itemID,
                name: foundItem.name,
                category: foundItem.category,
                imageURL: foundItem.imageURL,
                price: foundItem.price,
            });
        }
        else{
            console.log("Item not found");
            return res.status(400).json({ message: "Item not found" });
        }
    }
    catch (error) {
        console.error("Error retrieving item:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

/**
 * 
 * @desc Get all items from the item collection
 * @route GET /api/items/getAll
 * @access Public
 */
export const getAllItems = async (req, res) => {
    try {
        console.log("Fetching all items");
        const items = await Item.find({}); // Fetch all items
        if (items) {
            console.log("Valid item data");
            return res.status(200).json(items);
        }
        else{
            console.log("No items found");
            return res.status(400).json({ message: "No items found" });
        }
    }
    catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

/** 
 * @desc Register a new item to add to the item collection
 * @route PUT /api/items/update
 * @access Public
 */
export const updateItem = async (req, res) => {
    const { itemID, category, imageURL, price } = req.body;
    if (!itemID || !mongoose.Types.ObjectId.isValid(itemID)) {
        return res.status(400).json({ error: "Invalid or missing itemID" });
    }

    try {
        console.log("Getting item of ID: ", itemID, " to update");
        const itemToUpdate = await Item.findOne({ itemID }); // Fetch an item by the itemID
        if (itemToUpdate){
            itemToUpdate.name = name || itemToUpdate.name; // Name is not updated, but we need to set it to avoid overwriting
            itemToUpdate.category = category || itemToUpdate.category;
            itemToUpdate.imageURL = imageURL || itemToUpdate.imageURL;
            itemToUpdate.price = price || itemToUpdate.price;

            await itemToUpdate.save(); // Save the updated item
            console.log("Item updated successfully");
            res.json({
                itemID: itemToUpdate.itemID,
                name: itemToUpdate.name,
                category: itemToUpdate.category,
                imageURL: itemToUpdate.imageURL,
                price: itemToUpdate.price,
            });
        }
        else{
            console.log("Item not found");
            return res.status(400).json({ message: "Item not found" });
        }
    }
    catch (error){
        console.error("Error retrieving item:", error);
        res.status(500).json({ message: "Server error", error });
    }
}