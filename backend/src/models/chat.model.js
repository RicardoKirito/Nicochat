import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    users: {
        type:[mongoose.Types.ObjectId],
        required: true,
        ref: 'User'
    },
    code: {type: String, unique: true},
    last_message: {
        type: mongoose.Types.ObjectId, 
        ref: 'Message'
    }

}, {timestamps: true})

export default mongoose.model('Chat', ChatSchema)