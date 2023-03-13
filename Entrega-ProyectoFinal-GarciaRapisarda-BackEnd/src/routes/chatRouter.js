const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.get('/', chatController.getAll);
router.get('/:id', chatController.getById);
router.post('/', chatController.create);
router.delete('/:id', chatController.deleteById);
router.put('/:id', chatController.updateById);

module.exports = router;


