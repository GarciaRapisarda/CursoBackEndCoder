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
const { setupSocket } = require('./src/config/socketIo');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");




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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", require("./src/routes/productRouter"));

configMongoDb();
setupSocket(server);

const PORT = parseInt(process.argv.slice(2)) || 8080
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
module.exports = {io, app, server};