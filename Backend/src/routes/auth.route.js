import express from "express"
import { SignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",SignUp)

router.get("/login",(req,res)=>{
res.send("Login endpoint")
})

export default router