import { sendWelcomeEmail } from "../../email/emailHandlers.js"
import { generateToken } from "../libs/utils.js"
import User from "../models/User.model.js"
import bcrypt from "bcryptjs"

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
        const user = await User.findOne({email:email})
        if (user) return res.status(400).json({ message: "Email already exists" })
        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPasword
        })
        if (newUser) {
            const savedUser= await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName,process.env.CLIENT_URL)
            } catch (error) {
                console.error("Failde to send welcome email:",error);
                
            }
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.error("Error in SingUp controller:",error);
        res.status(500).json({message:"Internal server error"})
    }
}