const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.delete('/:id', productController.deleteById);
router.put('/:id', productController.updateById);

module.exports = router;
