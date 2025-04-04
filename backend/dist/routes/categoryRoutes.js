"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController"); // Use controller logic
const router = express_1.default.Router();
// Route to determine transaction category (via AI or manual input)
router.post("/generate-category", categoryController_1.generateCategory);
exports.default = router;
