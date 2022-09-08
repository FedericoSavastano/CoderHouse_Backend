import {loadProducts,  fileRoute} from './contenedor.js';

import fs  from 'fs';
import express from 'express';
const app = express();


let fileContent;
async function getProductContent() {
    await loadProducts();
    fileContent = JSON.parse(await fs.promises.readFile(fileRoute, 'utf-8'))
}

await getProductContent();

app.get('/productos', (req, res) =>{
    res.send(fileContent)
});

app.get('/productoRandom', (req, res) =>{
    let randomNumber = Math.floor(Math.random() * fileContent.length);
    res.send(fileContent[randomNumber])
});


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${server.address().port}`);
})
server.on('error', (err)=> console.log(err));








