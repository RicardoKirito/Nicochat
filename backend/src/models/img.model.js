import mongoose from "mongoose";

const ImgSchema = new mongoose.Schema({
    folder: {
        type: String,
        require: true
    },
    img: {
        type: String, 
        require: true,
    },
    messageid:  {type: mongoose.Types.ObjectId, required: true, ref:'Message'}, 

},{timestamps: true});
export default mongoose.model("Img", ImgSchema)