const { Router } = require('express');
const router = Router();
const ordenController = require('../controllers/ordenController');

router.get('/', ordenController.getOrdenes);

router.get('/:id', ordenController.getOrdenById);

router.post('/', ordenController.createOrden);


module.exports = router;