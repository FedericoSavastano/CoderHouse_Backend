//Ejercicio 1

// let obj = {}; 

// for(let i = 0; i<99; i++){
//     let num = Math.ceil(Math.random() * 20 );
    
//      obj[num] ? obj[num] = obj[num] + 1 : obj[num] = 1;
     
// }

// console.log(obj);

// const productos = [
//     { id:1, nombre:'Escuadra', precio:323.45 },
//     { id:2, nombre:'Calculadora', precio:234.56 },
//     { id:3, nombre:'Globo Terráqueo', precio:45.67 },
//     { id:4, nombre:'Paleta Pintura', precio:456.78 },
//     { id:5, nombre:'Reloj', precio:67.89 },
//     { id:6, nombre:'Agenda', precio:78.90 }
// ];


// let productNames = productos.map(e => e.nombre).join(", ");
// console.log(productNames);
 
// let totalPrice = productos.reduce((initValue, currValue) => initValue + currValue.precio, 0).toFixed(2);
// console.log(totalPrice);

// let averagePrice = (totalPrice / productos.map(e => e.precio).length).toFixed(2);
// console.log(averagePrice);

// let minPrice = Math.min(... productos.map(e => e.precio) );
// console.log(minPrice)

// let maxPrice = Math.max(... productos.map(e => e.precio) );
// console.log(maxPrice)

// let obj = {
//     productNames,
//     totalPrice,
//     averagePrice,
//     minPrice,
//     maxPrice
// }
// console.log(obj)


const moment = require('moment');

let nacimiento = moment([1986, 04, 18]);
let hoy = moment([2022, 06, 09]);
// a.diff(b, 'days') // 1

console.log(`hoy es ${hoy.format('L')}`)
console.log(`nací el dia ${nacimiento.format('L')}`)
console.log(`Desde mi nacimiento han pasado ${hoy.diff(nacimiento, 'days')} dias`);
console.log(`Desde mi nacimiento han pasado ${hoy.diff(nacimiento, 'years')} años`)