import express from "express"

const router = express.Router();

router.get("/signup",(req,res)=>{
res.send("SignUp endpoint")
})

router.get("/login",(req,res)=>{
res.send("Login endpoint")
})

export default router