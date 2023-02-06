import express from 'express';
import connectMongoDb from './src/config/connectMongoDb.js';
import userRouter from './src/routes/userRouter.js';

const app = express();
const server = app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

server.on('error', error => {
    console.log('Error en el servidor:', error);
});

connectMongoDb();

app.use(express.json());
app.use('/users', userRouter);

