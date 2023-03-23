const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const UserModel = require('../models/UserModel')

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