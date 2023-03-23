const { Router } = require('express');
const router = Router();
const chatController = require('../controllers/chatController');
const {estaLogueado} = require('../middlewares/validations')
const {isAdmin} = require('../middlewares/validations')



router.get('/', estaLogueado, (req,res) => {
    res.render('chat.ejs', { title: 'Chat Page', user: req.user } )
  });
  
  router.get('/admin', estaLogueado, isAdmin, (req,res) => {
    res.render('chat-admin.ejs', { title: 'Chat Page', user: req.user } )
  });
  
  router.get('/users', estaLogueado, isAdmin, chatController.getListaUsuarios)
  
  router.get('/mensajes/:userId', estaLogueado, chatController.getUserMensajes);

module.exports = router;