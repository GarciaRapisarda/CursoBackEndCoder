const express = require('express');
const router = express.Router();
const passport = require('passport');
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

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register?error=true'
    }))

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
