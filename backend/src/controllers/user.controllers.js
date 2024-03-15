import { uploadImage } from "../helpers/Cloudinary.js";
import { Codigo } from "../models/codigo.model.js";
import { postService } from "../models/post.model.js";
import { userService } from "../models/user.model.js";
import fs from 'fs-extra';

export const userController = {
    async getUsers(req, res) {
        try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        } catch (error) {
        console.log(error);
        }
    },
    
    async getUserById(req, res) {
        try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
        } catch (error) {
        console.log(error);
        }
    },

    async getUserByUsername(req, res) {
        try {
        const { username } = req.params;
        const user = await userService.getUserByUsername(username);
        const post = await postService.getPostsByUserId(user.id);

        res.json({user, post});

        } catch (error) {
        console.log(error);
        }
    },
    
    async updateUser(req, res) {
        try {
        const { id } = req.params;
        const user = await userService.updateUser(id, req.body);
        res.status(200).json(user);
        } catch (error) {
        console.log(error);
        }
    },

    async changeProfilePhoto(req, res){
        try {
            if(req.files?.imagen){
                const imageUrl = await uploadImage(req.files.imagen.tempFilePath);
                req.body.imagen = imageUrl.secure_url;
                req.body.imagenId = imageUrl.public_id;
                await fs.unlink(req.files.imagen.tempFilePath);
            };
    
            const imageUpdated = await userService.changeProfilePhoto(req.user.id, req.body);
    
            res.status(200).json(imageUpdated);
        } catch (error) {
            console.log(error)
        }
    },

    async changeColor(req, res){
        try {
            const colorUpdated = await userService.changeColor(req.user.id, req.body);
            res.status(200).json(colorUpdated);
        } catch (error) {
            console.log(error)
        }
    },


    async valorar(req, res){
        try {
            const valorado = await userService.valorarProfesor(req.body);

            await Codigo.destroy({
                where: {
                    codigo: req.body.codigo
                }
            })
            res.status(200).json(valorado);
        } catch (error) {
            console.log(error)
        }
    }
    
};