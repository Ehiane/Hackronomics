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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const CategoryAI_1 = require("../routes/CategoryAI");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { amountSpent, transactionDate, location, vendor, category } = req.body;
        // If category is missing, use AI to generate one
        if (!category) {
            category = yield (0, CategoryAI_1.suggestCategory)(req.body);
        }
        const newTransaction = new Transaction_1.default({ amountSpent, transactionDate, location, vendor, category });
        yield newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ error: "Transaction creation failed" });
    }
});
exports.createTransaction = createTransaction;
