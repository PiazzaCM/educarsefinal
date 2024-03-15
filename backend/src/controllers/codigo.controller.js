import { codigoService } from "../models/codigo.model.js";

export const codigoController = {

    async generarCodigo(req, res){
        try {
            const codigo = await codigoService.generalLink(req.body);
            res.status(201).json(codigo.codigo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    async validarCodigo(req, res){
        try {
            const codigo = req.params.codigo;


            const codigoValido = await codigoService.validatorLink(codigo);
           
            if(codigoValido){
                res.status(200).json(codigoValido);
            }else{
                res.status(400).json({ message: 'Codigo invalido' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}