import { Router } from "express";
import { Register, Update} from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/register', Register)

userRouter.put('/update/:id', Update)


export default userRouter;