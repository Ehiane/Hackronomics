import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    transactionID: {type: String, required: true, unique: true}, 
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    amountSpent: {type: Number, required: true},

    transactionType: {type: String, enum: ["Card", "Cash", "Bank Transfer"], required: true},
    transactionDate: {type: Date, required: true},
    Location: {
        city: {type: String},
        state: {type: String},
        zipcode: {type: String}
    },

    description: {type: String, required: true}, 
    merchantName: {type: String, required: true},
    merchantType: {type: String, required: true}, // Fast Food, Grocery, etc.

    // AI - generated categories (through a microservice)
    category: {type: String},

});
export default mongoose.model("Transaction", TransactionSchema);
// things i took disputeOption, postedDate, Payment Method