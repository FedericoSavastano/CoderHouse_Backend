const socket = io.connect()

// CHAT 
const addMessage = ( ) =>{
    const mensaje = {
     text : document.getElementById('text').value,
     author : document.getElementById('author').value
    }
    socket.emit('new-message', mensaje)
    document.getElementById('text').value = ""
    return false
}

const formatDate = () => {
    let date = new Date()
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
}

function renderMessages(data) {
    const html = data.map((elem, index) => {
        return(`<div>
        <p>
            <strong style="color:blue">${elem.author}</strong>:
            <span style="color:brown"> [${formatDate()}] </span>
            <em style="color:green">${elem.text}</em> 
            </p>
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}


socket.on('message', (data)=>{
    renderMessages(data)
})

// PRODUCTS 
const addProduct = ( ) =>{
    const product = {
     title : document.getElementById('title').value,
     price : document.getElementById('price').value,
     thumbnail : document.getElementById('thumbnail').value
    }
     
    socket.emit('new-product', product)

    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";

    return false
}


function renderProducts(data) {
    console.log(data)
    if(data.length) {
    const tableHead = ` 
        <table class='table'>
        <thead class='thead-dark'>
            <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Thumbnail</th>
            </tr>
        </thead>
        <tbody>`;
 
    const tableBody = 
        data.map((elem, index) => {
            return(` 
                <tr>
                    <th scope='row'>
                        ${elem.id}
                    </th>
                    <td>
                        ${elem.title}
                    </td>
                    <td>
                        ${elem.price}
                    </td>
                    <td><img src=${elem.thumbnail}  alt="" border=1 height=48 width=48></img></th>
                </tr>
                `)
        }).join(" ");
    const tableHeadEnd = 
            `</tbody>
            </table>`;

    const html = tableHead + tableBody + tableHeadEnd;
    document.getElementById('products').innerHTML = html;
} else {
    document.getElementById('products').innerHTML = "There are no products yet";
}
}

socket.on('products', (data)=>{
    renderProducts(data)
})