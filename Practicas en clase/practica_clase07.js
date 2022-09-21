// EJERCICIO 1
/*
 Dada la siguiente constante: const frase = 'Hola mundo cómo están'// Realizar un servidor con API Rest usando node.js y express que contenga los siguientes endpoints get:// 1) '/api/frase' -> devuelve la frase en forma completa en un campo ‘frase’.// 2) '/api/letras/:num -> devuelve por número de orden la letra dentro de esa frase (num 1 refiere a la primera letra), en un campo ‘letra’.// 3) '/api/palabras/:num -> devuelve por número de orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo ‘palabra’.
  Aclaraciones:
- En el caso de las consignas 2) y 3), si se ingresa un parámetro no numérico o que esté fuera del rango de la cantidad total de letras o palabras (según el caso), el servidor debe devolver un objeto con la descripción de dicho error. Por ejemplo:
{ error: "El parámetro no es un número" } cuando el parámetro no es numérico
{ error: "El parámetro está fuera de rango" } cuando no está entre 1 y el total de letras/palabras
- El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.
*/
// import express from 'express';
// const app = express();

// const frase = 'Hola mundo cómo están'

// app.get('/api/frase', (req, res) => {
//     res.status(200).json({frase})
// })

// app.get('/api/letras/:num', (req, res) => {
//     let {num} = req.params;
//     num = parseInt(num);
   
//     if(isNaN(num))
//      res.status(400).json({error: "El parametro no es un numero"})

//     if(num -1 < 0 || num > frase.length)
//      res.status(400).json({error: "El parametro está fuera de rango"})

//     res.status(200).json({letra: frase[num -1]})

// })

// app.get('/api/palabras/:num', (req, res) => {
//     let {num} = req.params;
//     num = parseInt(num);
   
//     if(isNaN(num))
//      res.status(400).json({error: "El parametro no es un numero"})

//     if(num -1 < 0 || num > frase.split(" ").length)
//      res.status(400).json({error: "El parametro está fuera de rango"})
     
//     res.status(200).json({palabra: frase.split(" ")[num -1]})
// })


// app.listen(8080, err=>{
//     if(err)console.log(err)
//     console.log("listening on port 8080")
// })


// EJERCICIO 2
/*
Desarrollar un servidor que permita realizar la suma entre dos números utilizando tres rutas en estos formatos (Ejemplo con números 5 y 6)
a) Ruta get '/api/sumar/5/6
b) Ruta get '/api/sumar?num1=5&num2=62) 
c) Ruta get '/api/operacion/5+6
No hace falta validar los datos a sumar, asumimos que los ingresamos correctamente.
Implementar las rutas post, put y delete en la dirección '/api' respondiendo 'ok' + (post/put/delete) según corresponda. Probar estas rutas con Postman, verificando que el servidor responda con el mensaje correcto.
El servidor escuchará en el puerto 8080 y mostrará todos los mensajes de conexión/error que correspondan.
*/
// import express, { urlencoded } from 'express';
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: true}))
// const PORT = 8080;

// app.get('/api/sumar/:num1/:num2', (req, res) => {
//     let {num1, num2} = req.params;
//     res.status(200).json({resultado: parseInt(num1) + parseInt(num2)})
// })

// app.get('/api/sumarB/', (req, res)=>{
//     let [...num] = Object.values(req.query);
//     res.status(200).json({resultado: num.reduce((previousValue , currentValue) => parseInt(previousValue) + parseInt(currentValue), 0)})  
// })

// app.get('/api/operacion/:operation', (req, res)=>{
//     res.status(200).json({resultado: eval(req.params.operation)})
// })

// app.post('/api/posttest',(req, res) =>{
//     res.status(200).json({resultado: "Ok Post"})
// })

// app.put('/api/puttest',(req, res) =>{
//     res.status(200).json({resultado: "Ok Put"})
// })

// app.delete('/api/deletetest',(req, res) =>{
//     res.status(200).json({resultado: "Ok Delete"})
// })


// app.listen(PORT, err=>{
//     if(err) console.log(err);
//     console.log("Listening on port ", PORT)
// })

//EJERCICIO 3
/**
 * Considere la siguiente frase: ‘Frase inicial’
Realizar una aplicación de servidor node.js con express que incorpore las siguientes rutas:
GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1.
POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).

Aclaraciones:
Utilizar Postman para probar la funcionalidad.
El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

 */

import express, { urlencoded } from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080;
let frase = 'frase inicial'

app.get('/api/frase', (req, res)=>{
    res.status(200).json({frase})
})

app.get('/api/palabras/:pos', (req, res)=>{
    let position = parseInt(req.params.pos);
    let fraseArr = frase.split(' ');
    if(position -1 > fraseArr.length || position-1 < 0)
    res.status(400).json({error: "no hay palabra en esa posicion"});

    res.status(200).json({buscada: fraseArr[position -1]})
})

app.post('/api/palabras', (req, res)=>{
    let {palabra} = req.body;
    
    frase = frase + " " + palabra;
    res.status(200).json({
        agregada: palabra,
        pos: frase.split(' ').length -1
    })
})

app.put('/api/palabras/:pos', (req, res)=>{

    let anterior = frase.split(' ')[req.params.pos - 1];
    let fraseArr = frase.split(' ')
    fraseArr[req.params.pos - 1 ] = req.body.palabra;
    frase = fraseArr.join(' ');
    res.status(200).json({
        actualizada: req.body.palabra,
        anterior 
    })
})

app.delete('/api/palabras/:pos', (req, res)=>{
     
    let fraseArr = frase.split(' ')
    fraseArr.splice(req.params.pos - 1, 1);
    frase = fraseArr.join(' ');
    res.status(200).json({
        eliminada: req.params.pos,
    })
})



app.listen(PORT, err=>{
    if(err)console.log(err);
    console.log("Listening on port ", PORT)
})
