import express from "express";
import { registerUserItemList, getUserItemList, addToUserItemList, removeFromUserItemList } from "../controllers/userItemListController.js"; 

const router = express.Router();

// Route to register a new item in the user item list
router.post("/register/:userID", registerUserItemList);

// Route to get the user item list for a user
router.get("/get/:userID", getUserItemList);

// Route to add an item to the user item list
router.put("/add/:userID/:itemID", addToUserItemList);

// Route to remove an item from the user item list
router.put("/remove/:userID/:itemID", removeFromUserItemList);

export default router;