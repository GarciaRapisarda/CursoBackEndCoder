const express = require('express');
const Manager = require('../controllers/cartManager');
const router = express.Router();
const manager = new Manager();
 
router.post('/', (req, res) => {
    manager.addCart(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

router.delete('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).send({ error: 'El id debe ser un número' });
    } else {
        manager.delete(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(404).send(err);
            });
    }
});

module.exports = router;