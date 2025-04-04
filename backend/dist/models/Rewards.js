"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RewardsSchema = new mongoose_1.default.Schema({
    rewardID: { type: String, required: true, unique: true },
    UserID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", unique: true },
    rewardName: { type: String, required: true }, // Reward name (e.g. "10% off food")
    rewardType: { type: String, enum: ["Discount", "Bonus Points", "Special Item"], required: true },
    redeemed: { type: Boolean, default: false },
});
exports.default = mongoose_1.default.model("Rewards", RewardsSchema);
