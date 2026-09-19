import express from "express"
import { getAllContacts, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.get("/contacts", protectRoute, getAllContacts)
// router.get("/chats",getChatPartners)
router.get("/:id", protectRoute, getMessageByUserId)
router.post("/send/:id", protectRoute, sendMessage)

router.get("/send", (req, res) => {
    res.send("Messages Endpoint")
})

export default router