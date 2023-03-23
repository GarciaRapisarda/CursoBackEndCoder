const estaLogueado = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

const estaDeslogueado = (req, res, next) => {
    if (!req.isAuthenticated()) return next()
    res.redirect('/')
}

const isAdmin = (req, res, next) => {
    if (req.user.isAdmin === "S") return next();
    res.redirect("/");
  };

module.exports = {
    estaLogueado,
    estaDeslogueado,
    isAdmin
}