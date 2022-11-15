const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/User');

const app = express();
app.set("port", process.env.PORT || 8080);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'coderHouse',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

const auth = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

app.listen(app.get("port"), () => {
  console.log("Server running on port", app.get("port"));
});

app.get('/', auth, (req, res) => {
    res.redirect('/login');
});

app.get('/login', auth, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.route('/login').get(auth, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
}).post(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await User.findOne({ username: username }).exec();
        if (!user) {
            res.redirect('/login');
        }
        if (user.password != password) {
            res.redirect('/login');
        }
        req.session.user = user;
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

app.route('/signup').get(auth, (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
}).post((req, res) => {
    let user = new User({ 
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
});
    user.save((err, docs) => {
        if (err) {
            res.redirect('/signup');
        } else {
            req.session.user = docs;
            res.redirect('/dashboard');
        }
    });
});
   

app.get('/dashboard', (req, res) => {
     if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/dashboard.html');
        } else {
            res.redirect('/login');
            }
});

app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.send({ message: `Hasta luego, ${req.session.user.username} !` });
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


