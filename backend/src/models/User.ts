import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true }, 
    name: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    DOB: {type: String, required: true},
    primaryLocation: {type: String},
    zipcode: {type: String},
    savingsPlan: {type: mongoose.Schema.Types.ObjectId, ref: "SavingsPlan"}, // reference object to SavingsPlan model
    avatar: {type: mongoose.Schema.Types.ObjectId, ref: "Avatar"}, // reference object to Avatar model
    friendsList: [{type: String}],
});

export default mongoose.model("User", UserSchema);