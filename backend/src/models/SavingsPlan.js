import mongoose from "mongoose";
import { Transactions} from "./Transaction.js"; // Import the Transactions model

const SavingsPlanSchema = new mongoose.Schema({
    savingsPlanID: {type: String, required:true, unique:true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    balance: {type: Number, default: 0},
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId, ref:"Transaction" 
        }
    ],
    goalAmount: {type: Number, required: true},
    duration: {type: String, required: true}, //Duration (weekly, monthly)
    progress: {type: Number, default: 0},
    remainingAmount: {type: Number}, 
});

export default mongoose.model("SavingsPlan", SavingsPlanSchema);