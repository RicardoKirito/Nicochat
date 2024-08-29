import ws, { WebSocketServer } from 'ws';
import {Buffer} from 'buffer'
import app from './app.js'
import { connectDB } from './db.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';
import { addMessage } from './controllers/message.controller.js';
import { updateUserPicture } from './controllers/auth.controller.js'; 
import { updateUserPicture } from './controllers/auth.controller.js'; 
import { imageOptimaze } from './libs/imgoptimaze.js';
const server = app.listen(4000)
console.log('server on port', 4000)

connectDB();
const wss = new WebSocketServer({server});

wss.on('connection', (con, req)=>{

    function notifyOnelinePeople(){
        
        [...wss.clients].forEach(client=>{
            client.send(JSON.stringify({
                online: [...wss.clients].map(c=>({userid: c.userid, username: c.username})),
            }))
        })
    }

    function newMessage(){
        [...wss.clients].forEach(client=>{
            client.send(JSON.stringify({
                newMessage: ""}))
        })
    }
    function updateMessages(message){
        [...wss.clients].forEach(client=>{
            client.send(JSON.stringify({
                updateMessage: message.update, body: message.body, state: message.state, updater: con.userid}))
            })
        }
        
        con.isAlive = true;
    con.aliveConfirm = setInterval(()=>{
        con.ping()
        con.killtimer = setTimeout(()=>{
            con.isAlive = false;
            con.terminate();
            clearInterval(con.aliveConfirm)
            notifyOnelinePeople()
        }, 1000)
    }, 5000)

    con.on("pong", ()=>{
        clearTimeout(con.killtimer)
    })

    const cookie = req.headers.cookie;
    if(cookie){
        const tokenString = cookie.split(';').find(str=> str.trim().startsWith('token'));
        if(tokenString){
            const token = tokenString.replace("token=",'').trim();
            if(token){
                jwt.verify(token, JWT_SECRET, {}, (err, user)=>{
                    if(err) throw err;
                    con.userid = user.id;
                    con.username = user.username
                })
            }
        } 
        notifyOnelinePeople() 
    } 

    con.on('message', async (msg)=>{

        const message = JSON.parse(msg)
        const {to, body, file, chatid, update, profilePicture} = message;
        let filename = null;
        if(profilePicture){
            
            const buffer = Buffer.from(profilePicture.file.data.split(',')[1], 'base64')
            const optimized = await imageOptimaze(buffer, 300)
            updateUserPicture(profilePicture.id, optimized)
        }
        if(file){
            const buffer = Buffer.from(file.data.split(',')[1], 'base64')
            const optimized = await imageOptimaze(buffer, 700)
            filename = optimized;
        }
        if(chatid && (body || file)){
            const messageDB =  await addMessage({
                    chatid,
                    from: con.userid,
                    to,
                    body,
                    file: filename,
                    username: con.username,
                    state: "sent",
                    
            });
            newMessage();
            [...wss.clients]
                .filter(c=> c.userid === to || c.userid === con.userid)
                .forEach(c=> c.send(JSON.stringify(messageDB)));
        }
        if(update){
            updateMessages(message);
        }

        

    })
});

