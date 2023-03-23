const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const UserModel = require('../models/UserModel')
const transporter = require('../config/nodeMailer');
const client = require('../config/twilio')


passport.use(
  "local-register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => { 
      const { username, nombre, telefono, direccion, edad, avatar, isAdmin } = req.body;
      try {
        let user = await UserModel.findOne({ username })
        if (user) done(null, false, { message: 'Username ya registrado' }) 
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
          avatar,
          isAdmin
        })

        // Envío de SMS con Twilio
        const msgNuevoUsuarioSMS = {
          to: process.env.TEST_PHONE_NUMBER,
          from: process.env.TWILIO_PHONE_NUMBER,
          body: `¡Hola ${nombre}! Gracias por registrarte en nuestro sitio web.`
        }
        client.messages.create(msgNuevoUsuarioSMS)
        .then(message => {
          console.log(message.sid);
          console.log('Mensaje SMS enviado');
          done(null, user); 
        })
        .catch(err => console.log(err))

      } catch (err) {
        console.log(err)
        done(err); 
      }
    })
);

passport.use('local-log', new localStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	let user = await UserModel.findOne({email: email});
	if(!user) return done(null, false, {message: 'Email incorrecto.'});

	const match = await bcrypt.compare(password, user.password);
	if (!match) return done(null, false, {message: 'Contraseña incorrecta.'});

	return done(null, user);
}))


passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  UserModel.findById(id, function (err, user) {
    done(err, user)
  })
}) 


