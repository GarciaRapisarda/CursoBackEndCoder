const express = require('express')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const productRouter = require('./routes/productRouter')
const chatRouter = require('./routes/chatRouter')
let products = require('./models/productModel')

const Manager = require('./controllers/chatManager')
const manager = new Manager()

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/content', express.static('./src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views') // app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('create-product')
})

app.use('/products', productRouter)
app.use('/chat', chatRouter)

io.on('connection', socket => {
    console.log(`Client ${socket.id} connected...`)
    socket.emit('history', products)
    manager.findAll().then(result => socket.emit('chatHistory', result))
    socket.on('products', data => {
        io.emit('history', data)
    })
    socket.on('chat', data => {
        io.emit('chatHistory', data)
    })
})