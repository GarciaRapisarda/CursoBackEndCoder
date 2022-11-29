import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { initializePassport } from './passport.config.js';
import passport from 'passport';
import dotenv from 'dotenv';
import yargs from 'yargs';


dotenv.config();

const app = express();
const port = process.argv[2] || process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

const connection = mongoose.connect(process.env.MONGO_USERS , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_SESSIONS }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
});


app.use(express.json());
app.use(baseSession)
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));


app.post('/register', passport.authenticate('register', { failureRedirect: '/failureRegister'}), (req, res) => {
    res.send({message: 'Signed up'})
})

app.post('/failureRegister', (req, res) => {
    res.send({err: 'i cannot authenticate'})
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/failureLogin'}), (req, res) => {
    res.send({message: 'Logged in'})
})

app.post('/failureLogin', (req, res) => {
    res.send({err: 'i cannot login'})
}) 

app.get('/info', (req, res) => {
    res.send({datos: {
                    argumentos: process.argv.slice(2),
                    sistema: process.platform,
                    version: process.version,
                    memoria: process.memoryUsage(),
                    path: process.execPath,
                    carpeta: process.cwd(),
                    id: process.pid
                }
            })
})

