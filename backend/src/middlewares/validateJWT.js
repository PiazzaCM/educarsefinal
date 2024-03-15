import jwt from 'jsonwebtoken';
import { userService } from '../models/user.model.js'

export const validarJWT = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({
            msg: 'No token received'
        })
    };

    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        
        if(!id){
            console.log('token incorrecto');
            return res.status(400).json({
                msg: 'Error al autenticar'
            })
        };


        const user = await userService.getUserById(id);

        if(!user) return res.status(401).json({
            msg: 'No existe el usuario'
        })

       req.user = user;

        return next();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error de autenticacion'
        })
    }

}

