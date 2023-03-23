const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const transporter = require('../config/nodeMailer');
const client = require('../config/twilio')
const UserModel = require('../models/UserModel');
const {estaLogueado} = require('../middlewares/validations')
const {estaDeslogueado} = require('../middlewares/validations')




router.get('/', estaLogueado, (req, res) => {
    console.log(req.user);
    const response = req.user;
    res.render('dashboard', response);
})


router.get('/register', estaDeslogueado, (req, res) => {

    const response = {
        error: req.query.error,
        msg: req.query.msg
    }
    res.render('register', response);
})

router.get('/login', estaDeslogueado, (req, res) => {
    const response = {
        error: req.query.error
    }
    res.render('login', response);
})

router.post('/register', async (req, res) => {
    const { username, email, password, nombre, telefono, direccion, edad, avatar } = req.body;
    try {
        let user = await UserModel.findOne({ username })
        if (user) res.redirect('/register?error=true&msg=Username ya registrado')
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
            res.send('Mensaje SMS enviado');
        })
        .catch(err => console.log(err))

        res.redirect('/');
    } catch (err) {
        console.log(err)
    }
})

router.post('/login', passport.authenticate('local-log', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
}))

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


module.exports = router; 
