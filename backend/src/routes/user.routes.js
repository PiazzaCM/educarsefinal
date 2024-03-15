import { Router } from "express";
import { userController } from '../controllers/user.controllers.js';
import { validarJWT } from "../middlewares/validateJWT.js";


const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:username', userController.getUserByUsername);
userRouter.put('/:id', userController.updateUser);
userRouter.patch('/updatePhoto', validarJWT, userController.changeProfilePhoto); 
userRouter.patch('/updateColor', validarJWT, userController.changeColor); 
userRouter.post('/valorar', userController.valorar)

export { userRouter };