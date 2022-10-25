const { Router } = require('express');
const carritosFsManager = require('../controllers/carritosFsManager');

const routes = Router();

router.get('/carritos', (req, res) => {
    carritosFsManager.getCarritos()
        .then((carritosList) => {
            return res.status(200).json(carritosList);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});
