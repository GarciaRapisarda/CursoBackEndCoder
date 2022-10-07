const express = require('express')
const router = express.Router()
const options = require('../config/sqlite3.config')

const Manager = require('../controllers/chatManager')
const manager = new Manager(options, 'chat')

router.get('/', (req, res) => {
    manager.findAll().then(result => res.send(result))
})

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.message) return res.send({error: 'data is required'})
    manager.create(req.body).then(result => res.send(result))
})

module.exports = router