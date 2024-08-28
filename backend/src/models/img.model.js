import mongoose from "mongoose";

const ImgSchema = new mongoose.Schema({
    folder: {
        type: String,
        require: true
    },
    img: {
        type: String, 
        require: true,
    }
})
export default mongoose.model("Img", ImgSchema)