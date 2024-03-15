import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { startDb } from './src/config/connectDB.js';
import 'dotenv/config.js';
import { createServer } from 'http';
import { Server as WebSocketServer} from 'socket.io';

import 'ejs';
import './src/models/user.model.js'
import './src/models/typesUsers.model.js'
import './src/models/typePost.model.js'
import './src/models/typePrice.js'
import './src/models/post.model.js'
import './src/models/codigo.model.js'

import { environments } from './src/config/enviroments.js'
import { authRouter } from './src/routes/auth.routes.js'
import { viewsRouter } from './src/routes/views.routes.js'
import { postRouter } from './src/routes/post.routes.js';
import { userRouter } from './src/routes/user.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fileUpload from 'express-fileupload';
import { codigoRouter } from './src/routes/codigo.routes.js';
import { contactoRouter } from './src/routes/contacto.routes.js';


const app = express();
const server = createServer(app);
const io = new WebSocketServer(server, {
  cors: {
      origin: '*',
  },
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('posts', (data)=>{
    socket.broadcast.emit('new_posts', data)
  })
});


app.set('view engine', 'ejs');


//rutas
app.use('/view', viewsRouter)

app.use('/api', authRouter)

app.use('/post', postRouter)

app.use('/user', userRouter)

app.use('/codigo', codigoRouter)

app.use('/contacto', contactoRouter)

server.listen(environments.PORT, async () => {
    console.log(`server on port ${environments.PORT}`)
    startDb()
  })
  