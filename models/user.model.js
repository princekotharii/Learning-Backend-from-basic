import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Fullname:{type : String,},
    Email:{type:String,  unique:true},
    Password:{type:String, }
},{timestamps : true})

export const user = mongoose.model("User",userSchema)