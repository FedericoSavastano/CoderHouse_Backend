const socket = io();

socket.on('saludo', (data) =>{
    console.log(data)

    socket.emit('respuesta', "hola desde el lado del cliente")
})



function sendText() {
    let message = document.getElementById('enter').value
    
    socket.emit('respuesta', message)

    document.getElementById('enter').value = ""

}
 





socket.on('respuesta-server', (data)=>{
    console.log(data)
    
    // addToScreen(data[data.length -1])

    const mensajes = data.map(d => `<li>${d.socketId} said : ${d.mensaje}</li> <br/>` )
    const ul = document.querySelector('ul')
    ul.innerHTML = mensajes.join('')

   
})

const addToScreen = (d) => {
    const para = document.createElement("p");
    const node = document.createTextNode(`Name ${d.socketId} said : ${d.mensaje}`);
    para.appendChild(node);
    
    const element = document.getElementById("te");
    element.appendChild(para);
}



