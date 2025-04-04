"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemsSchema = new mongoose_1.default.Schema({
    itemID: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    imageURL: { type: String }, // URL to item's image
    price: { type: Number, required: true }, // price in "Save Points"
});
exports.default = mongoose_1.default.model("Store", ItemsSchema);
