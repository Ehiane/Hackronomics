import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
    discountID: { type: String, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    discountPercentage: { type: Number, required: true }, 
    expirationDate: { type: Date, required: true },
    redeemed: { type: Boolean, default: false }, 
});

export default mongoose.model("Discount", DiscountSchema);