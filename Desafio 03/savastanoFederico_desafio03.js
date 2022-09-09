import {Contenedor,  fileRoute, loadProducts} from './contenedor.js';
import express from 'express';

const app = express();
let fileContent = new Contenedor(fileRoute);


app.get('/productos', (req, res) =>{
    fileContent.getAll().then(products =>res.send(products))
});

app.get('/productoRandom', (req, res) =>{
    fileContent.getAll().then(products =>{
        let randomNumber = Math.ceil(Math.random() * products.length);
        fileContent.getById(randomNumber).then(product =>res.send(product))
    })
});


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${server.address().port}`);
})
server.on('error', (err)=> console.log(err));








