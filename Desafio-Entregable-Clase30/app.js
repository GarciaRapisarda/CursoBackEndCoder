import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { initializePassport } from './src/config/passport.config.js';
import passport from 'passport';
import dotenv from 'dotenv';
import {router} from './src/routes/router.js';
import core from 'os';
import cluster from 'cluster';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';




dotenv.config();

const app = express();
const port = process.argv[2] || process.env.PORT;
const mode = process.argv[3] || process.env.MODE;
yargs(hideBin(process.argv))
    .command({
        command: 'server',
        describe: 'Inicia el servidor',
        builder: {
            port: {
                describe: 'Puerto del servidor',
                demandOption: true,
                type: 'number'
            }
        },
        handler(argv) {
            const server = app.listen(argv.port, () => {
                console.log(`Servidor escuchando en el puerto ${server.address().port}`);
            });
        }
    })
    .parse()

if (cluster.isPrimary) {
    console.log('cantidad de nucleos: ', core.cpus().length);
    console.log(`pid master ${process.pid}`);
    if (mode === 'cluster') {
        for (let i = 0; i < core.cpus().length; i++) {
            cluster.fork();
        }
        cluster.on('exit', worker => {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });
    } else {
        cluster.fork();
        cluster.on('exit', worker => {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });
    }
} else {
    
    const server = app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
    });
}

    





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

app.use('/api/random', router);

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
    res.send(
        {datos: {
                    argumentos: process.argv.slice(2),
                    sistema: process.platform,
                    version: process.version,
                    memoria: process.memoryUsage(),
                    path: process.execPath,
                    carpeta: process.cwd(),
                    id: process.pid,
                    nucleos: core.cpus().length
                }                
            })
})
