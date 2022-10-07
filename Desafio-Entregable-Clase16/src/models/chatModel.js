const Manager = require('../controllers/chatManager')
const manager = new Manager()

let chat = manager.findAll()

module.exports = chat