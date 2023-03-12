const express = require('express');
const router = express.Router();
const Manager = require('../controllers/chatMongoDbManager');
const {io} = require('../../app2');


router.get('/', async (req, res) => {
    try {
        const data = await Manager.getChat()
        res.render('chat', { chatData: data });
        console.log(data);
    } catch (err) {
        res.status(404).send({message: 'No se pudo obtener los mensajes'});	
    }
});

router.get('/:email', async (req, res) => {
    let { email } = req.params;
    try {
       const data = await Manager.getChatById(email)
         res.send(data);
    } catch (err) {
        res.status(404).send({message: 'No se pudo obtener el chat'});	
    }
});

router.post('/', async (req, res) => {
    let { email, message } = req.body;
    try {
        const data = await Manager.postChat(email, message);
        res.send(data);
    } catch (err) {
        res.status(404).send({message: 'No se pudo guardar el mensaje'});
    }
});

router.post('/', async (req, res) => {
  const { email, message } = req.body;
  try {
    const chat = await Manager.postChat(email, message);
    io.emit('new message', chat);
    res.status(201).json(chat);
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).send('Error saving chat message');
  }
});

router.get('/chat', (req, res) => {
  res.render('chat');
});

module.exports = router; 


