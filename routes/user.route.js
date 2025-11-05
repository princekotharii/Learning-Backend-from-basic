import { Router } from "express";
import { Register } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/register', Register)

export default userRouter;