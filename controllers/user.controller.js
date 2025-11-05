import { user } from "../models/user.model.js";

export async function Register(req, res) {
    try {
        // 1️⃣ Extract data from request body
        const { Fullname, Email, Password } = req.body;

        // 2️⃣ Create a new user document
        const userRegister = new user({
            Fullname,
            Email,
            Password,
        });

        // 3️⃣ Save it to the database
        await userRegister.save();

        console.log("User registered");
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
