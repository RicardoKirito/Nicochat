import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    picture: String,
    username: {
        type: String,
         unique: true,
          required:true,
          trim:true},
    email: {
        type: String,
        unique: true,
        required:true,
        trim:true},
    password: {
        type: String,  
        required:true
    },
    contacts: 
         [{
            chat_id: {type: mongoose.Types.ObjectId, required: true, ref:'Chat'},
            userid: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
            username: {type: String, required: true},
            nickname: {type: String, default: '', trim: true},
            blocked: {type: Boolean, default: false},
            unreadMessages: {type: Number, default: 0},
        }]
        
    
}, {timestamps: true});

export default mongoose.model("User", userSchema)