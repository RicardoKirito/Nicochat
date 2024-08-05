import {JWT_SECRET} from '../config.js'
import jwt from 'jsonwebtoken'
export function createToken(payload){

    return new Promise((resolve, reject)=>{
        
        jwt.sign(payload, JWT_SECRET,
         {
            expiresIn: "1d"
        },
        (err, token)=>{
            if(err) reject(err);
            resolve(token);
        } )
    })
}