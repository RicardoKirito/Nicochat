import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import messageRoutes from './routes/message.routes.js'
import { getDirname } from './libs/dirname.js';
import chatRoutes from './routes/chat.routes.js'
import path from 'node:path'

const __dirname = getDirname(import.meta.url)
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors({
    origin: "",
    credentials: true,
}))
app.use("/api",authRoutes)
app.use("/api",messageRoutes)
app.use("/api", chatRoutes)
app.use("/api/uploads", express.static(getDirname(import.meta.url) + '/uploads') );

app.use(express.static(__dirname, "Nicochat/dist"))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "Nicochat", "dist", "index.html"))
})
export default app;