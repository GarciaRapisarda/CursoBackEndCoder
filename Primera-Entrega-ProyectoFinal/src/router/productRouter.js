const express = require('express');
const router = express.Router();
const Manager = require('../controllers/productManager');
const manager = new Manager();

let isAdmin=true;

router.get('/', (req, res) => {
    manager.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: `ruta ${req.baseUrl} y método ${req.method} no autorizada` });
    } else {
        manager.findById(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }
});

router.post('/', (req, res) => {
    if (isAdmin) {
        manager.saveProduct(req.body)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    } else {
        res.status(401).send({ error: `ruta ${req.baseUrl} y método ${req.method} no autorizada` });
    }
});

router.put('/:id', (req, res) => {
    if (isAdmin) {
        if (isNaN(req.params.id)) {
            res.status(400).send({ error: 'El id debe ser un número' });
        } else {
            manager.updateProduct(req.params.id, req.body)
                .then((data) => {
                    console.log(data);
                    res.send(data);
                })
        }
    } else {
        res.status(401).send({ error: `ruta ${req.baseUrl} y método ${req.method} no autorizada` });
    }
});

router.delete('/:id', (req, res) => {
    if (isAdmin) {
        if (isNaN(req.params.id)) {
            res.status(400).send({ error: 'El id debe ser un número' });
        } else {
            manager.deleteProduct(req.params.id)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        }
    } else {
        res.status(401).send({ error: `ruta ${req.baseUrl} y método ${req.method} no autorizada` });
    }
});

module.exports = router;

