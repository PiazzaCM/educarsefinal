import { deleteImage, uploadImage } from "../helpers/Cloudinary.js";
import { postService } from "../models/post.model.js";
import fs from 'fs-extra';

export const postController = {
    async createPost(req, res) {
        try {

            if(req.files?.imagen){
                const imageUrl = await uploadImage(req.files.imagen.tempFilePath);
                req.body.imagen = imageUrl.secure_url;
                req.body.imagenId = imageUrl.public_id;
                console.log(imageUrl);
                await fs.unlink(req.files.imagen.tempFilePath);
            };

            //console.log("ESTO ES EL CONSOLELOG DEL CONTROLADOR DE USUARIOOO",req.user)
            const post = await postService.createPost({...req.body, userId: req.user.id});
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getPostById(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updatePost(req, res) {
        try {
            if(req.files?.imagen){
                await deleteImage(req.body.imagenId);
                const imageUrl = await uploadImage(req.files.imagen.tempFilePath);
                req.body.imagen = imageUrl.secure_url;
                req.body.imagenId = imageUrl.public_id;
                console.log(imageUrl);
                await fs.unlink(req.files.imagen.tempFilePath);
            };


            const post = await postService.updatePostById(req.params.id, req.body);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deletePost(req, res) {
        try {
            await postService.deletePostById(req.params.id);

            res.status(200).json({ message: 'Post deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}



    