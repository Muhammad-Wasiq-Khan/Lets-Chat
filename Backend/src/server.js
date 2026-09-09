import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/auth.route.js'
import messagesRoutes from './routes/message.route.js'
import path from "path"
dotenv.config()
const app = express()
const __dirname=path.resolve()
const port = process.env.PORT

app.use("/api/auth",authRoutes)
app.use("/api/messages",messagesRoutes)
if (process.env.NODE_ENV ==="production") {
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
}
 app.get("*",(res,_)=>{
    res.sendFile(path.join(__dirname,"../Frontend/dist/index.html"))
 })
app.listen(port,()=>{
    console.log("Server is runing on port",port)
})