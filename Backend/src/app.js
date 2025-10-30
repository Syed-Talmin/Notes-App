import express from "express"
import authRouter from "./routes/auth.route.js"
import notesRouter from "./routes/notes.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL,],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))

app.get("/health-check", (req, res) => {
    res.status(200).send("OK")
})

app.use("/api/auth", authRouter)
app.use("/api/notes", notesRouter)

export default app