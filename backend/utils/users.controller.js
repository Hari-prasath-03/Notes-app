import dotenv from "dotenv";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY; // node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"


export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ success: true, message: "Logged successfully", token, userId: user._id  });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user profile", error });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res  .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.status(200).json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user profile", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user", error });
  }
};
