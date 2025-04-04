"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DOB: { type: String, required: true },
    primaryLocation: { type: String },
    zipcode: { type: String },
    savingsPlan: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "SavingsPlan" }, // reference object to SavingsPlan model
    avatar: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Avatar" }, // reference object to Avatar model
    friendsList: [{ type: String }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
