import Router from 'express';


const viewsRouter = Router();

viewsRouter.get('/', (req, res)=>{
    res.render('index')
}); 

viewsRouter.get('/login',(req, res) => {
    res.render('login');
});

viewsRouter.get('/register',(req, res) => {
    res.render('registro');
});

viewsRouter.get('/explorer',(req, res) => {
    res.render('explorar');
});

export { viewsRouter };