const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {estaLogueado} = require('../middlewares/validations')
const {isAdmin} = require('../middlewares/validations')

router.get('/', userController.getAllUsers);

router.get('/', estaLogueado, isAdmin, userController.getAllUsers);

router.get('/me', userController.getUserByEmail);

router.get('/:id', estaLogueado, isAdmin, userController.getUserById);

module.exports = router;
