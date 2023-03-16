const { Router } = require('express');
const router = Router();
const chatController = require('../controllers/chatController');

router.get('/users', chatController.getListaUsuarios)

router.get('/mensajes/:id',  chatController.getUserMensajes);

module.exports = router;