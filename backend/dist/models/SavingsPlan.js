"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SavingsPlanSchema = new mongoose_1.default.Schema({
    savingsPlanID: { type: String, required: true, unique: true },
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, default: 0 },
    transactions: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Transaction" }],
    goalAmount: { type: Number, required: true },
    duration: { type: String, required: true }, //Duration (weekly, monthly)
    progress: { type: Number, default: 0 },
    remainingAmount: { type: Number },
});
exports.default = mongoose_1.default.model("SavingsPlan", SavingsPlanSchema);
