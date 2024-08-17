import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://ricardoelfuerte11:hYlH4ytDClA2GNAS@cluster0.zabfjdw.mongodb.net/?retryWrites=true&w=majority")
        console.log("Data Base connected");
    }catch(error){
        console.log("DB", error);
    }
}