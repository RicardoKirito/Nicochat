import mongoose from "mongoose";

const MessageSchecma = new mongoose.Schema({
    chatid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Chat'
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    body: {
        type: String,
        require: true,
    }, 
    file: String,
    state: {
        type: String, 
        require: true
    },
    edited: {
        type: Boolean, 
        require: true
    }
}, {timestamps: true})

export default mongoose.model('Message', MessageSchecma);