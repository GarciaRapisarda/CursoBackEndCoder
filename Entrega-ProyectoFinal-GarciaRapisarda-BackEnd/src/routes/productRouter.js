const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: El nombre del producto
 *              description:
 *                  type: string
 *                  description: Una breve descripcion del producto
 *              price:
 *                  type: integer
 *                  description: Precio en pesos del producto
 *          required:
 *              - title
 *              - description
 *              - price
 *          example:
 *              title: Coca Cola del desierto
 *              description: Excelente bebida refrescante para limpiar los inodoros
 *              price: 14
 */


/**
 * @swagger
 * /products:
 *  post:
 *      summary: Registra un nuevo producto en el catálogo
 *      tags: [Product]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 */

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.delete('/:id', productController.deleteById);
router.put('/:id', productController.updateById);

module.exports = router;
