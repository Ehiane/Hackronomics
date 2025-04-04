"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCategory = void 0;
const CategoryAI_1 = require("../routes/CategoryAI"); // Import AI function
const generateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionData = req.body; // JSON from request
        if (!transactionData) {
            res.status(400).json({ error: "Invalid or missing transaction data" });
            return;
        }
        // Use AI only if category is missing
        const category = yield (0, CategoryAI_1.suggestCategory)(transactionData);
        res.status(200).json({ category });
    }
    catch (error) {
        console.error("Error generating category:", error);
        res.status(500).json({ error: "Failed to generate category" });
    }
});
exports.generateCategory = generateCategory;
