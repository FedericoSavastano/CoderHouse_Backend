const express = require('express')
const { Server: HttpSever } = require('http')
const { Server : IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpSever(app)
const io = new IOServer(httpServer)



app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.send("Hola")
})

httpServer.listen(4000, ()=>{
    console.log("Listening on port 4000")
})

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];


io.on('connection', (clients)=>{
    console.log('un cliente se conecto')

    clients.emit('mensajes', messages)

    clients.on('new-message', (data)=>{
        messages.push(data)
        io.sockets.emit('mensajes', messages)
    })
})