require ('dotenv').config()
require('./src/config/local') 
const configMongoDb = require('./src/config/configMongoDb')
const express = require('express')
const session = require("express-session");
const infoRouter = require("./src/routes/infoRouter.js")
const randomRouter = require("./src/routes/apiRandomsRouter.js") 
const passport = require('passport');
const MongoSession = require('connect-mongodb-session')(session)
const cookieParser = require("cookie-parser");
const cluster = require('cluster')
const core = require('os')
const cartRouterMongo = require('./src/routes/cartRouter')
const productRouterMongo = require('./src/routes/productRouter')
const logRouter = require('./src/routes/logRouter')
const chatRouter = require('./src/routes/chatRouter')
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.Server(app);
const io = new Server(server)

const PORT = parseInt(process.argv.slice(2)) || 8080


const storeMS = new MongoSession({
  uri: process.env.MONGO_URI,
  collection: 'colSesiones'
})

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());


app.use(session({
  key: 'user_sid',
  secret: process.env.SECRETO_COOKIE,
  cookie: { maxAge: 600000 }, 
  saveUninitialized: false,  
  resave: false,
  store: storeMS 
}))



app.use(passport.initialize());

app.use(passport.session());

app.use('/', logRouter)

app.use('/cart', cartRouterMongo)

app.use('/products', productRouterMongo)

app.use('/chat', chatRouter)

app.use('/info', infoRouter)

io.on('connection', socket => {
  console.log(`Client ${socket.id} connected...`);
 
  socket.on('new message', async data => {
    try {
      const { email, message } = data;
      const chat = await Manager.postChat(email, message);
      io.emit('new message', chat);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
    socket.on('chat', data => {
        io.emit('chatHistory', data);
        }
    );
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

app.use('/api/random', randomRouter)

configMongoDb();

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid}`)
  for (let i=0; i<core.cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', () => cluster.fork())
} else {
  app.listen(PORT, () => console.log(`Server up on port ${PORT} by process ${process.pid}`))
  
}


