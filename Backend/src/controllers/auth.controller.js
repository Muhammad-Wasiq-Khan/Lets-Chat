import { sendWelcomeEmail } from "../../email/emailHandlers.js"
import { ENV } from "../libs/env.js"
import { generateToken } from "../libs/utils.js"
import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../libs/Cloudinary.js"

export const SignUp = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must contain at least 8 characters." })
        }
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!regexPassword.test(password)) {
            return res.status(400).json({ message: "Password must contain one lowercase and  uppercase letter,and a special character." })
        }
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!regexEmail.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }
        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ message: "Email already exists" })
        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPasword
        })
        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
            } catch (error) {
                console.error("Failed to send welcome email:", error);

            }
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.error("Error in SignUp controller:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password is required." })
    }
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const Logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully" })
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile Pic is required" })
        }
        const userId = req.user._id

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true }).select("-password")

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Error in updateProfile  controller:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}