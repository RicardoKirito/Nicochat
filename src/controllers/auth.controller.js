import { createToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import userModel from '../models/user.model.js';

export const register = async (req, res)=>{
    const {username, email, password} = req.body;


    try{
        const userFound =await User.findOne({email}) || await User.findOne({username})
        if(userFound) return res.status(400).json(["User already exits"])
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hash,
            picture: null,
        })
        const userSaved = await newUser.save()
        const token = await createToken({id: userSaved._id, username: userSaved.username})
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message, ok: false})
    }

}
export const updateUserPicture = async (id, filename)=>{
    await User.updateOne({_id: id}, {picture: filename});
}

export const login = async (req, res)=>{
    const {username, password} = req.body;
    try{
        const userFound = await User.findOne({username})
        if(!userFound) return res.status(400).json(["invalid credentials"])
        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json(["invalid credentials"])

        const token = await createToken({id: userFound._id, username: userFound.username})
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            picture: userFound.picture,
        });

    }catch(error){
        res.status(500).json({message: error})
    }
}
export const changePassword =async (req, res)=>{
    const {current, newP, id} = req.body;
    try{
        const userFound = await userModel.findById(id);
        const isMath = await bcrypt.compare(current, userFound.password);
        if(!isMath) return res.status(400).json(["invalid current password"]);
        const hased = await bcrypt.hash(newP, 10);
        await userModel.updateOne({id}, {$set: {password: hased}})
        return res.status(200).json(["Successfully changed"])

    }catch(err){
        res.status(500).json({message: err})
    }
}

export const logout = (req, res)=>{
    res.clearCookie('token')
    return res.status(200).json({message: "logout"})
}

export const profile = async (req, res)=>{
    const userFound = await User.findById(req.user.id)
    
    if(!userFound) return res.status(404).json({message: "User not found"})
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}
export const verify=(req, res)=>{
    const {token} = req.cookies;

    if(!token) return res.status(401).json(["Unauthorized"])

    jwt.verify(token, JWT_SECRET, async (err, user)=>{

        if(err) return res.status(401).json(["Unauthorized"])
        const userFound = await User.findById(user.id)

        if(!userFound)return res.status(401).json(['Unauthorized'])

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email, 
            picture: userFound.picture,
        })
    })
}