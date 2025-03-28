import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure correct import
import mongoose from "mongoose";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, DOB, primaryLocation, zipcode } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            userID: new mongoose.Types.ObjectId(), // ✅ Mongoose is now defined
            name,
            email,
            password: hashedPassword,
            DOB,
            primaryLocation,
            zipcode,
            role: role || "user", 
            friendsList: [],
            avatar: null,
            savingsPlan: null,
        });

        if (user) {
            console.log("Valid user data");
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                DOB: user.DOB,
                primaryLocation: user.primaryLocation,
                zipcode: user.zipcode,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            console.log("Invalid user data");
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in registerUser:", error); 
        res.status(500).json({ message: "Server error", error });
    }
};

// User login function
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
/**
 * @desc    Get user by userID
 * @route   GET /api/users/:userID
 * @access  Public
 */
export const getUserProfile = async (req, res) => {
    try {
        console.log(`Fetching user with ID: ${req.params.userID}`);

        const user = await User.findOne({ userID: req.params.userID }).select("-password");

        if (user) {
            console.log(`User found: ${user.email}`);
            res.json(user);
        } else {
            console.warn(`User not found: ${req.params.userID}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error in getUserByID:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * @desc    Update user profile by userID
 * @route   PUT /api/users/:userID
 * @access  Public
 */
export const updateUserProfile = async (req, res) => {
    try {
        console.log(`Updating user with ID: ${req.params.userID}`);

        const user = await User.findOne({ userID: req.params.userID });

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.DOB = req.body.DOB || user.DOB;
            user.primaryLocation = req.body.primaryLocation || user.primaryLocation;
            user.zipcode = req.body.zipcode || user.zipcode;

            // Check if password needs to be updated
            if (req.body.password) {
                console.log(`Updating password for user: ${user.email}`);
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();
            console.log(`User updated successfully: ${updatedUser.email}`);

            res.json({
                userID: updatedUser.userID,
                name: updatedUser.name,
                email: updatedUser.email,
                DOB: updatedUser.DOB,
                primaryLocation: updatedUser.primaryLocation,
                zipcode: updatedUser.zipcode,
            });
        } else {
            console.warn(`User not found for update: ${req.params.userID}`);
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error in updateUserByID:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

/**
 * @desc    Delete a user by userID
 * @route   DELETE /api/users/:userID
 * @access  Public
 */
export const deleteUser = async (req, res) => {
    try {
        console.log(`Attempting to delete user with ID: ${req.params.userID}`);

        const user = await User.findOne({ userID: req.params.userID });

        if (!user) {
            console.warn(`User not found for deletion: ${req.params.userID}`);
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();
        console.log(`User deleted successfully: ${user.email}`);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUserByID:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
  };