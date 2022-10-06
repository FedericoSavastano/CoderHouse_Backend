const socket = io.connect()

const addMessage = ( ) =>{
    const mensaje = {
     text : document.getElementById('text').value,
     author : document.getElementById('author').value
    }
    console.log(mensaje)
    socket.emit('new-message', mensaje)
    return false
}

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}


socket.on('mensajes', (data)=>{
    console.log(data)
    render(data)
})