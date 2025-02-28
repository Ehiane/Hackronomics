import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
    userID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DOB: { type: String, required: true },
    primaryLocation: { type: String },
    zipcode: { type: String },
    // role: String, // 'admin' or 'user'
    savingsPlan: { type: mongoose.Schema.Types.ObjectId, ref: "SavingsPlan" },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: "Avatar" },
    friendsList: [{ type: String }],
    },
    { timestamps: true }
);

// Remove password when returning JSON
UserSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

// Method to verify password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    const bcrypt = await import("bcryptjs");
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
