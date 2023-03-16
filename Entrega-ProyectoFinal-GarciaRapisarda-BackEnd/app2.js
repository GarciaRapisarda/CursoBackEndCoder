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
const cartRouterMongo = require('./src/routes/cartRouter')
const productRouterMongo = require('./src/routes/productRouter')
const logRouter = require('./src/routes/logRouter')
const chatRouter = require('./src/routes/chatRouter')
const app = express();
const { Server } = require('socket.io');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", require("./src/routes/productRouter"));

configMongoDb();

const servidor = app.listen(PORT, () =>
  console.log(`Server corriendo en el puerto ${PORT}`)
);

const io = new Server(servidor);


io.on("connection", (socket) => {
  Chat.find().then((mensajes) => {
    io.emit("lista-mensajes", mensajes);
  });

  socket.on("message", async (data) => {
    let newMessage = new Chat({
      sender: data.userId,
      receiver: data.admin === "S" ? data.userId : null,
      mensaje: data.mensaje,
      email: data.email ? data.email : null,
    });
    await newMessage.save();
    let mensajes = await Chat.find();
    io.emit("lista-mensajes", mensajes);
    io.emit("lista-mensajes-admin", mensajes);
  });

  socket.on("filtro-mensajes", async (userId) => {
    const mensajes = await Chat.find({ sender: userId });
    io.emit("lista-mensajes", mensajes);
  });

  socket.on("todos-mensajes", async () => {
    const mensajes = await Chat.find();
    io.emit("lista-mensajes", mensajes);
  });
});