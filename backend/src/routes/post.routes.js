import { Router } from "express";
import { postController } from '../controllers/post.controller.js'
import { validateResult } from "../helpers/validateResult.js";
import { postValida } from '../validator/post.valida.js';
import { validarJWT } from "../middlewares/validateJWT.js";

const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', [postValida, validateResult, validarJWT], postController.createPost);
postRouter.put('/:id', [postValida, validateResult, validarJWT], postController.updatePost);
postRouter.delete('/:id', postController.deletePost);


export { postRouter };