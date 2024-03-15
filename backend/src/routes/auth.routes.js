import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validateResult } from '../helpers/validateResult.js';
import { loginValida } from '../validator/login.valida.js';
import { registroValida } from '../validator/registro.valida.js';

const authRouter = Router();

authRouter.post('/login', loginValida, validateResult, loginUser);

authRouter.post('/register', registroValida, validateResult, registerUser);


export { authRouter };