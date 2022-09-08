// EJERCICIO 1

// const http = require('http');
 

// const server = http.createServer((peticion, respuesta)=>{
//     //Acciones

//     const getSaludo = () => {
//         const hora = new Date().getHours();
//        //  const hora = 15;
//         if (hora>= 6 && hora <= 12) return "Buenos Dias";
//         if (hora>= 13 && hora <= 19) return "Buenas Tardes";
//         return "Buenas Noches";
//     }
    
//     const saludo = getSaludo()
    
//     respuesta.status = 200;

//     respuesta.end( `${saludo}`)
// });
// const port = 8080;
// const connectServer = server.listen(port, ()=>{console.log(`listening to port ${port}`)});


// EJERCICIO 2

// const express = require ('express');
// const moment = require('moment');
// const app = express();

// app.get('/', (req, res) =>{
//     res.send(`<h1 style= "color:blue">Bienvenidos al servidor express</h1>`)
// });

// let contador = 0;
// app.get('/visitas', (req, res) =>{
//     res.send(`<h1>esto se visitó ${++contador} veces </h1>`)
// });

// app.get('/fyh', (req, res) =>{
//     res.send(`<h1> ${moment().format('L')}  ${moment().format('LTS')} </h1>`)
// })

// const PORT = 4000;

// const server = app.listen(PORT, ()=>{
//     //if (err) console.log(err)
//     console.log(`Listenign on port ${server.address().port}`);
// })

// server.on('error', (err)=> console.log(err));


