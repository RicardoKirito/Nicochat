import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";


export const authRequired = (req, res, next)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "Not authorized"})
    jwt.verify(token, JWT_SECRET, (err, user)=>{
        if(err) return res.status(401).json({message: "Unauthorized "})
        req.user = user;
        next()
    })
}