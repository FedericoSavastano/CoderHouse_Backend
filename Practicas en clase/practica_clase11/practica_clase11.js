const express = require('express');
const {Server : HttpServer} = require ('http')
const {Server : IOServer } = require ('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: __dirname})
})

const port = 8080;
const server = httpServer.listen(port, ()=>{
    console.log(`listening on port ${server.address().port}`)
})

const arrayMensajes = [];

io.on('connection', (socket)=>{
    console.log('usuario conectado')
    console.log(socket.id)
    socket.emit('saludo', 'hola desde el lado del servidor')

    socket.on('respuesta', (data)=>{
        console.log(data)
        arrayMensajes.push({socketId: socket.id, mensaje: data})
        io.sockets.emit('respuesta-server', arrayMensajes)
    })

    socket.on('disconnect', ()=>{
        console.log('usuario desconectado')
    })
})