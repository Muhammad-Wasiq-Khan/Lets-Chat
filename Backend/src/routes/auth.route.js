import express from "express"
import { SignUp, Login, Logout, updateProfile } from "../controllers/auth.controller.js";
import  { protectRoute } from "../middleware/auth.middleware.js"
import { arcjetMiddleware } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetMiddleware)

router.get("/test", (req,res)=>{
    res.status(200).json({message:"Test route"})
})
router.post("/signup", SignUp)
router.post("/login", Login)
router.post("/logout", Logout)

router.put("/update-profile", protectRoute, updateProfile)

router.get("/check",protectRoute,(req,res)=> res.status(200).json(req.user))

export default router