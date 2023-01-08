const express = require('express')
const router = express.Router()
const sqlite = require('../config/sqlite.config')
const tabla_chat = 'chat' 

const Manager = require('../controllers/chatManager')
const manager = new Manager(sqlite, tabla_chat)

router.get('/', (req, res) => {
    try{
    manager.findAll().then(result => res.send(result))
    }catch{(err=>console.log(err))}
    finally{(()=>mysql.destroy())}
})

router.post('/', (req, res) => {
    try{
    if (!req.body.email || !req.body.message) return res.send({error: 'data is required'})
    // create the new objet `Date`
    const now = new Date();
    const date = now.toLocaleString();
    const {email, msg} =req.body;
    const message = {
        email,
        msg,
        date
    }
    manager.create(message).then(result => res.send(result))
    }catch{(err=>console.log(err))}
    finally{(()=>mysql.destroy())}
})

module.exports = router