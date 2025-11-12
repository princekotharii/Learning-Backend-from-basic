import { Router } from "express";
import { Register, Update } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post('/register', upload.single('Image'), Register);
userRouter.put('/update/:id', upload.single('Image'), Update);

export default userRouter;
