const express = require ('express');
const fs = require("fs");
const app = express();

const fileRoute = "./productos.txt";

const readFile = (fileRoute) => {
    let fileContent = fs.readFileSync(fileRoute, 'utf-8') ;
    let fileContentParsed = JSON.parse(fileContent);
    return fileContentParsed;
}

let fileContent = readFile(fileRoute);


app.get('/productos', (req, res) =>{
    res.send(fileContent)
});

app.get('/productoRandom', (req, res) =>{
    let randomNumber = Math.floor(Math.random() * fileContent.length);
    res.send(fileContent[randomNumber])
});


const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${server.address().port}`);
})
server.on('error', (err)=> console.log(err));