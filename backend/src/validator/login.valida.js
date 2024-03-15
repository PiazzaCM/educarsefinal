import { check } from "express-validator";

export const loginValida = [
    check('email', 'El email es obligatorio')
    .isEmail(),

    check('password', 'La contraseña es obligatoria')
    .notEmpty(),
     

];