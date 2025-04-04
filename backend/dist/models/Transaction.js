"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    transactionID: { type: String, required: true, unique: true },
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    amountSpent: { type: Number, required: true },
    transactionType: { type: String, enum: ["Card", "Cash", "Bank Transfer"], required: true },
    transactionDate: { type: Date, required: true },
    Location: {
        city: { type: String },
        state: { type: String },
        zipcode: { type: String }
    },
    description: { type: String, required: true },
    merchantName: { type: String, required: true },
    merchantType: { type: String, required: true }, // Fast Food, Grocery, etc.
    // AI - generated categories (through a microservice)
    category: { type: String, required: true },
});
exports.default = mongoose_1.default.model("Transaction", TransactionSchema);
// things i took disputeOption, postedDate, Payment Method
