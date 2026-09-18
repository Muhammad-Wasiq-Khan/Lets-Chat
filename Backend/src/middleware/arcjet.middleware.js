import aj from "../libs/Arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(403).json({ message: "Rate Limit exceeded. Please try again later." })
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied." })
            } else {
                return res.status(403).json({ message: "Access denied by security policy" })
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed Bot detected.",
                message: "Malicious Bot activity detected."
            })
        }

        next()
    } catch (error) {
        console.log("Arcjet Protection Error:", error)
        next()
    }
}