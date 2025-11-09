import { User } from "../models/user.model.js";
import httpStatus from "http-status"
import bcrypt from "bcrypt"
import crypto from "crypto"

export const register = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exist" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            password: hashPassword
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({
            message: "User Registered"
        })
    } catch (error) {
        console.log(`Error in register : ${error}`);
        res.status(httpStatus.CREATED).json({
            message: `Error in register.`
        })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "Please provide all fields."
        })
    }
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        // Compare password with await
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Generate token and save
        const token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({
            message: "Login Success",
            token
        });

    } catch (error) {
        console.log(`Error in login : ${error}`);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Error in login."
        })
    }
}