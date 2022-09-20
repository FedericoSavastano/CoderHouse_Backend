// Dada la siguiente constante: const frase = 'Hola mundo cómo están'// Realizar un servidor con API Rest usando node.js y express que contenga los siguientes endpoints get:// 1) '/api/frase' -> devuelve la frase en forma completa en un campo ‘frase’.// 2) '/api/letras/:num -> devuelve por número de orden la letra dentro de esa frase (num 1 refiere a la primera letra), en un campo ‘letra’.// 3) '/api/palabras/:num -> devuelve por número de orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo ‘palabra’.

import express from 'express';
const app = express();

const frase = 'Hola mundo cómo están'

app.get('/api/frase', (req, res) => {
    res.json({frase})
})

app.get('/api/letras/:num', (req, res) => {
    let {num} = req.params;
    num = parseInt(num);
   
    if(isNaN(num))
     res.status(400).json({error: "El parametro no es un numero"})

    if(num -1 < 0 || num > frase.length)
     res.status(400).json({error: "El parametro está fuera de rango"})

    res.status(200).json({letra: frase[num -1]})

})

app.get('/api/palabras/:num', (req, res) => {
    let {num} = req.params;
    num = parseInt(num);
   
    if(isNaN(num))
     res.status(400).json({error: "El parametro no es un numero"})

    if(num -1 < 0 || num > frase.split(" ").length)
     res.status(400).json({error: "El parametro está fuera de rango"})
     
    res.json({palabra: frase.split(" ")[num -1]})
})


app.listen(8080, err=>{
    if(err)console.log(err)
    console.log("listening on port 8080")
})