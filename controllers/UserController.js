const User = require('../models/UserModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const JWT_SECRET = process.env.JWT_SECRET;

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such User" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { user_name, user_password, user_dob, user_gender,user_age,user_image, user_role, user_like, user_location } = req.body;

    try {
        const existingUser = await User.findOne({ user_name });

        if (existingUser) {
            return res.status(400).json({ error: "User name already exists" });
        }
        const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);

        const user = await User.create({ 
            user_name, 
            user_password: hashedPassword,
            user_dob,
            user_gender,
            user_age,
            user_image,
            user_role,
            user_location,
            user_like
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such User" });
    }

    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such User" });
    }

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update user like
const updateLikeInUser = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "No Such User" });
        }

        const existingUser = await User.findById(user_id);

        if (!existingUser) {
            return res.status(400).json({ error: "No Such User" });
        }

        if (!user.user_like.includes(user_id)) {
            user.user_like.push(user_id);
            await user.save();
        } else {
            return res.status(400).json({ error: "User already liked" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User login
const loginUser = async (req, res) => {
    const { user_name, user_password } = req.body;

    try {
        const user = await User.findOne({ user_name });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const hashedPassword = CryptoJS.SHA256(user_password).toString(CryptoJS.enc.Hex);

        if (hashedPassword === user.user_password) {
            return res.json({
                user_id: user._id,
                user_name: user.user_name,
                user_password: user.user_password,
                user_dob: user.user_dob,
                user_gender: user.user_gender,
                user_age: user.user_age,
                user_image: user.user_image,
                user_role: user.user_role,
                user_location: user.user_location,
                user_like: user.user_like,
            });
        } else {
            return res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
    updateLikeInUser,
};
