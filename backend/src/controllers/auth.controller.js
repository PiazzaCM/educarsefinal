import { userService } from '../models/user.model.js';
import { createJWT } from '../helpers/jwt.js';
import { uploadImage } from '../helpers/Cloudinary.js';
import fs from 'fs-extra';

export const registerUser = async (req, res) => {
    try {

        if(req.files?.imagen){
            const imageUrl = await uploadImage(req.files.imagen.tempFilePath);
            req.body.imagen = imageUrl.secure_url;
            req.body.imagenId = imageUrl.public_id;
            await fs.unlink(req.files.imagen.tempFilePath);
        };

        await userService.createUser(req.body);

        res.status(200).json({
            mensaje: 'Usuario registrado correctamente',
        })

         } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await userService.getUserByEmailandPassword(req.body.email, req.body.password);
        if (!user) {
            return res.status(404).json({ error: 'No existe el usuario' })
        }
        const isMatch = await userService.validatePassword(req.body.password, user.password)
        if (!isMatch) {
            return res.status(404).json({ error: 'Contraseña incorrecta' })
        }
        const token = await createJWT({ id: user.id })
        res.status(200).json({
            id: user.id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            imagen: user.imagen,
            valoracion: user.valoracion,
            portadaColor: user.portadaColor,
            role: user.typeUserId,
            token: token.token
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


