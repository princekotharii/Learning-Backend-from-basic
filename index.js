import express from "express";
import 'dotenv/config'
import { connectDB } from "./config/db.js";

import userRouter from './routes/user.route.js'
// import { connectDB } from "./config/db";


const app = express()

app.use(express.json())

app.use('/api', userRouter)

app.use("/", () => {
    console.log("runnung");
    
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on" , process.env.PORT);
        
    })
})