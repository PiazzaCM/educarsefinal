import { check } from "express-validator";

export const postValida = [
    check('title', 'El titulo es obligatorio')
    .notEmpty(),



    check('disponibilidad', 'La disponibilidad es obligatoria')
    .notEmpty(),

    check('precio', 'El precio es obligatorio')
    .notEmpty(),

    check('descripcion', 'La descripcion es obligatoria')
    .notEmpty(),
     
];