import { Router } from 'express';
import { enviarEmail } from '../helpers/sendEmail.js';

const contactoRouter = Router();

contactoRouter.post('/', async (req, res) => {
    try {
        await enviarEmail(req.body);
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Error al enviar el email' });
    }

    return res.status(200).json({ message: 'Email enviado correctamente' });
});


export { contactoRouter }