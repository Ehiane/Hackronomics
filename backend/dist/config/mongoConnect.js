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
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config(); // Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Load environment variables from one folder up
const uri = process.env.MONGO_URI; // Use .env variable
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// funtion to connect to MongoDB
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db("admin").command({ ping: 1 });
            console.log("Connected to the Hackronomics MongoDB Database!");
        }
        catch (error) {
            console.error("MongoDB Connection Error:", error);
            process.exit(1);
        }
    });
}
exports.default = connectDB;
