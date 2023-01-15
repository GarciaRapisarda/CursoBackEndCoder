const express = require('express');
const Manager = require('../controllers/cartManager');
const router = express.Router();
const manager = new Manager();

router.get('/', (req, res) => {
    manager.getCarritos()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: 'El id debe ser un número' });
    } else {
        manager.getCarrito(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }
}); 

router.post('/', (req, res) => {
    manager.addCarrito(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.put('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: 'El id debe ser un número' });
    } else {
        manager.updateCarrito(req.params.id, req.body)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: 'El id debe ser un número' });
    } else {
        manager.deleteCarrito(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }
});


module.exports = router;
