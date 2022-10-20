import express from 'express';
import {Server as HttpSever} from 'http';
import {Server as IOServer } from 'socket.io';
 import {messages} from './chat.js';
 import {products, addProduct} from './products.js'

  import {router as productRoutes} from './routes/productsRoutes.js'; 


import { dbConnection } from './database/config.js';
import   {containerProducts}   from './containers/containerProducts.js'

const app = express()
const httpServer = new HttpSever(app)
const io = new IOServer(httpServer)


app.use(express.static('public'))

// app.get('/', (req, res)=>{
//     res.send("Hola")
// })

//////Products wiht mariaDB ////////

const productsMariaDB = new containerProducts(dbConnection.mysql, 'productos')


//// Routes ////
app.use('/api/productos', productRoutes);
app.use('/api/carrito', cart);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
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