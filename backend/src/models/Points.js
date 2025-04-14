import mongoose from "mongoose";

const PointsSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 }, // Points earned by the user
});

const Points = mongoose.model("Points", PointsSchema);
export default Points;
