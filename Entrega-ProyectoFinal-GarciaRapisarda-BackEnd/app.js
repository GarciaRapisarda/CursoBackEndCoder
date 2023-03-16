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