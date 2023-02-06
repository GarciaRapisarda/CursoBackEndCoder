import express from 'express';
import productController from '../controllers/productController.js';
const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.delete('/:id', productController.deleteById);
router.put('/:id', productController.updateById);

export default router;