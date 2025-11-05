import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("db connected");
        
    }catch(error){
        console.log("error in connection");
        
    }
}