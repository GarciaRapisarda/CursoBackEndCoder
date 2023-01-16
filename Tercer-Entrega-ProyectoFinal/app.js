require ('dotenv').config()
require('./src/config/local') 

const express = require('express')
const session = require("express-session");
const infoRouter = require("./src/routes/infoRouter.js") // MOD
const randomRouter = require("./src/routes/apiRandomsRouter.js") 
const passport = require('passport');
const MongoSession = require('connect-mongodb-session')(session)
const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs')
const cluster = require('cluster')
const core = require('os')
const UserModel = require('./src/models/user');
const routes = require('./src/routes/productRouter')
const cartRouterMongo = require('./src/routes/cartRouter')
const transporter = require('./src/config/nodeMailer')
const client = require('./src/config/twilio')
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

app.use('/', express.static('public'))

app.use(routes)

app.use('/cart', cartRouterMongo)


if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid}`)
  for (let i=0; i<core.cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', () => cluster.fork())
} else {
  app.listen(PORT, () => console.log(`Server up on port ${PORT} by process ${process.pid}`))
  
  const estaLogueado = (req, res, next) => {
    if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

const estaDeslogueado = (req, res, next) => {
  if(!req.isAuthenticated()) return next()
  res.redirect('/')
}


app.get('/', estaLogueado, (req, res) => { 
  console.log(req.user);
  const response = req.user;    
  res.render('dashboard', response); 
})

app.get('/register', estaDeslogueado, (req, res) => {

  const response = {
    error: req.query.error,
    msg: req.query.msg
   }
  res.render('register', response);
})

app.get('/login', estaDeslogueado, (req, res) => {  
  const response = {
   error: req.query.error
  }
  res.render('login', response);
})

//Registro y Mail de Registro al administrador
app.post('/register', async (req, res) => { 
  const {username, email, password, nombre, telefono, direccion, edad, avatar} = req.body;
  try {
    let user = await UserModel.findOne({ username })
    if(user) res.redirect('/register?error=true&msg=Username ya registrado')
    const mailToAdmin = { 
      from: process.env.TEST_EMAIL,
      to: process.env.TEST_RECEIVER,
      subject: 'Nuevo usuario registrado',
      html: `<h1>Se ha registrado un nuevo usuario</h1>
      <tr>
      <td>Nombre: ${nombre}</td>
      <td>Username: ${username}</td>
      <td>Email: ${email}</td>
      <td>Telefono: ${telefono}</td>
      <td>Direccion: ${direccion}</td>
      <td>Edad: ${edad}</td>
      <td>Avatar: ${avatar}</td>
      </tr>`
    }
    transporter.sendMail(mailToAdmin, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  
    const hashPassword = await bcrypt.hash(password, 12);
    user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      nombre, 
      telefono,
      direccion,
      edad,
      avatar
    })
    res.redirect('/');
  } catch (err) { 
    console.log(err)
  }
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?error=true'
}
))

app.get('/test', (req, res) => {
  const msgPruebaSMS = {
    to: process.env.TEST_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: 'Hola, estoy probando el envio de SMS'
    }
    client.messages.create(msgPruebaSMS)
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))
    res.send('Mensaje enviado')
})


app.get('/logout', function (req, res, next) {
	req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
});

app.use('/info', infoRouter)
app.use('/api/random', randomRouter)

}