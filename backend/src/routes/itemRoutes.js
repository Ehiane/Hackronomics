import express from "express";
import { registerItem, getItem, getAllItems, updateItem} from "../controllers/itemController.js";

const router = express.Router();

// Route to register a new item
router.post("/register", registerItem);

// Route to get an item by itemID
router.get("/get/:itemID", getItem);

// Route to get all items
router.get("/getAll", getAllItems);

// Route to update an item by itemID
router.put("/update", updateItem);

export default router;