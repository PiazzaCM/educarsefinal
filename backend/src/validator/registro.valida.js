import { check } from "express-validator";

export const registroValida = [
    check('name', 'El nombre es obligatorio')
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),

    check('surname', 'El apellido es obligatorio')
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('El apellido debe tener al menos 3 caracteres'),

    check('email', 'El email es obligatorio')
    .isEmail()
    .withMessage('El email debe ser válido'),

    check('password', 'La contraseña es obligatoria')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una mayúscula y un número'),


];

