import { Router } from "express";
import { codigoController } from "../controllers/codigo.controller.js";

const codigoRouter = Router();

codigoRouter.post('/', codigoController.generarCodigo);

codigoRouter.get('/:codigo', codigoController.validarCodigo);


export { codigoRouter };