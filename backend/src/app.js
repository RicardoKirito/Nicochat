import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import messageRoutes from './routes/message.routes.js'
import { getDirname } from './libs/dirname.js';
import chatRoutes from './routes/chat.routes.js'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:4173",
    credentials: true,
}))
app.use("/api",authRoutes)
app.use("/api",messageRoutes)
app.use("/api", chatRoutes)
app.use("/api/uploads", express.static(getDirname(import.meta.url) + '/uploads') );
export default app;