import mongoose from "mongoose";

const RewardsSchema = new mongoose.Schema({
    rewardID: {type: String, required: true, unique: true},
    UserID: {type: mongoose.Schema.Types.ObjectId, ref:"User", unique:true},
    rewardName: {type: String, required: true}, // Reward name (e.g. "10% off food")
    rewardType: {type: String, enum: ["Discount", "Bonus Points", "Special Item"], required: true},
    redeemed: {type: Boolean, default: false},
});

export default mongoose.model("Rewards", RewardsSchema)