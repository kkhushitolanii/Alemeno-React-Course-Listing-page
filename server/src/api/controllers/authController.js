import User from "../models/user.js";
import jwt from "jsonwebtoken";
const jwtSecret = "loki";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const password = data.password;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const saltRounds = 10;

    console.log("Salt Rounds:", saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const password = data.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.status(200).json({ user: email, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
