import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from './routes/auth.route.js'
import messagesRoutes from './routes/message.route.js'
import { connectDB } from "./libs/db.js"
import { ENV } from "./libs/env.js"


const app = express()
const __dirname = path.resolve()

const port = ENV.PORT

app.use(express.json())
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messagesRoutes)

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))
}
app.get("*splat", (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
})
app.listen(port, () => {
    console.log("Server is runing on port", port)
    connectDB()
})