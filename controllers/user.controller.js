import { user } from "../models/user.model.js";

// 🟢 Register Controller
export async function Register(req, res) {
    try {
        const { Fullname, Email, Password } = req.body;

        const userRegister = new user({ Fullname, Email, Password });
        await userRegister.save();

        console.log("User registered");
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 🟢 Update Controller
export async function Update(req, res) {
    try {
        const { id } = req.params;

        const updatedUser = await user.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User updated successfully", data: updatedUser });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
