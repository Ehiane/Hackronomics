"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DiscountSchema = new mongoose_1.default.Schema({
    discountID: { type: String, required: true, unique: true },
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    discountPercentage: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    redeemed: { type: Boolean, default: false },
});
exports.default = mongoose_1.default.model("Discount", DiscountSchema);
