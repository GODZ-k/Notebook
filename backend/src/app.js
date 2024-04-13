import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();




app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204

    // methods: "GET"
}))



app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: false, }))
app.use(cookieParser())
app.use(express.static("public"))


// routes import

import userRouter from "./routes/user.route.js";
import notesRoute from "./routes/note.route.js"

// routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/notes", notesRoute)

export { app }