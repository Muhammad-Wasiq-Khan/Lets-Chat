import cloudinary from "../libs/Cloudinary.js"
import Message from "../models/Message.model.js"
import User from "../models/User.model.js"

export const getAllContacts = async (req, res) => {
    try {
        const LoggedInUserId = req.user._id
        const filtteredUser = await User.find({ _id: { $ne: LoggedInUserId } }).select("-password")

        res.status(200).json({ filtteredUser })
    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id
        const { id: otherUserId } = req.params

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: myId }
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessageByUserId:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body

        const { id: receiverId } = req.params
        const senderId = req.user._id

        if (!text && !image) {
            res.status(400).json({message:"Text or image is required"})
        }

        if (senderId.equals(receiverId)) {
            res.status(400).json({message:"You can't send message to yourself."})
        }

        const receiverFound= await User.exists({_id:receiverId})
        if (!receiverFound) {
            res.status(400).json({message:"User dosen't exist."})
        }
        
        let imageUrl
        if (image) {
            const uploadImage = await cloudinary.uploader.upload(image)
            imageUrl = uploadImage.secure_url
        }

        const newMessage = Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessages:", error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const myId = req.user._id

        const message = await Message.find({
            $or: [{ senderId: myId }, { receiverId: myId }]
        })

        const chatPartnerIds = [
            ...new Set(
                message.map((msg) =>
                    msg.senderId.toString() === myId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
                )
            )
        ]

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password")
        res.status(200).json(chatPartners)

    } catch (error) {
        console.log("Error in getChatPartners:", error);
        res.status(500).json({ message: "Internal Server Error", error })
    }

}
