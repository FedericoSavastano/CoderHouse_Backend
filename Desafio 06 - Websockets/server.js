import express from 'express';
import {Server as HttpSever} from 'http';
import { Server as IOServer } from 'socket.io';
import {messages} from './chat.js';
import {products, addProduct} from './products.js'

const app = express()
const httpServer = new HttpSever(app)
const io = new IOServer(httpServer)


app.use(express.static('public'))

// app.get('/', (req, res)=>{
//     res.send("Hola")
// })

httpServer.listen(8080, ()=>{
    console.log("Listening on port 8080")
})

 


io.on('connection', (clients)=>{
    console.log('un cliente se conecto')
//CHAT
    clients.emit('message', messages)

    clients.on('new-message', (data)=>{
        messages.push(data)
        io.sockets.emit('message', messages)
    })

//PRODUCTS
    clients.emit('products', products)

    clients.on('new-product', (data)=>{
        addProduct(data)
        io.sockets.emit('products', products)
    })
})