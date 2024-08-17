import { getChatFiles } from "../libs/uploadFile.js";
import chatModel from "../models/chat.model.js"
import userModel from "../models/user.model.js";


export const getChat= async (req, res)=>{
    
    const chat = await userModel
    .find({_id: req.user.id}, {contacts: 1})
    .populate({path: 'contacts.chat_id', select:'last_message',  populate: 'last_message'})
    .populate({path: 'contacts.userid', select: ['picture', 'email']})
    res.json(chat);

}
export const getAllChatFiles = async (req, res)=>{

   const list = await getChatFiles(req.params.id)
   res.json(list)
}
export const createChat = async (req, res)=>{
    const myId = req.user.id,

    {userid, username, code } = req.body;

    let chat = await chatModel.findOne({code:code || myId > userid? `${myId}${userid}`:`${userid}${myId}`})
    
    if(!chat){
        chat = await chatModel.create({
            users: [myId, userid],
            code: code || myId > userid? `${myId}${userid}`:`${userid}${myId}` ,
        })
    }
    const user =await userModel.findOne({_id:myId, 'contacts.chat_id': chat._id})
    if(!user){
    await userModel.updateOne(
        {_id: myId}, {$addToSet: { contacts: 
            {
                chat_id: chat._id,
                userid: chat.users[1],
                username: username,
                nickname: '',
                blocked: false
            }
            }
        }
    )
    }
    res.json(chat);
}

export const searchChat = async(req, res)=>{

    const contactResults = new Set();
    const contacts= await userModel.find({_id: req.user.id}, {contacts: 1, _id: 0})
    .populate({path: 'contacts', populate: {path: 'userid', select: ["picture", "email"]} })

    const results = contacts[0].contacts.filter(contact=> {
        const valid = contact.nickname.toLocaleLowerCase().includes(req.params.username)
        if(valid){
            contactResults.add(contact.username)
        }
    });
    const byUsername = await userModel.find({username: {$regex: `${req.params.username}`, $options: 'i'}, _id: {$ne: req.user.id}}, {_id: 1, picture: 1, username: 1, email: 1})
    
    if(byUsername.length>0) {
        byUsername.forEach(user=>{
            if(!contactResults.has(user.username)){
                contactResults.add(user.username)
            }
        })
        results.push(...byUsername)
    }
    res.json([{contacts: [...results]}])
}

export const deleteChat = async(req, res)=>{
    const user = await userModel.updateOne(
        { _id: req.user.id },
        { $pull: { 'contacts': { 'chat_id': req.params.id } } }
    )
    res.json(user)
    
}

export const updateChat = async(req, res)=>{
    const user = await userModel.updateOne(
        {_id: req.user.id, "contacts.chat_id": req.params.id},
        {$set: {
            "contacts.$.nickname": req.body.nickname,
            "contacts.$.blocked" : req.body.blocked, 
            "contacts.$.unreadMessages": req.body.unread,
        }}
    )
    res.json(user);
}
