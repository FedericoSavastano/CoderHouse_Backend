import {options} from './database/options/mariaDB.js';
 
import knex from 'knex'
knex(options)


 
  

export const products = []

// export const addProduct = (prod) => {
//     if (!products.length) {
//         products.push(Object.assign({}, prod, { id: 1 }));
//     } else {
//         products.push(
//             Object.assign({}, prod, {
//                 id: products[products.length - 1].id + 1,
//             })
//         );
//     } 
// }


export const addProduct = (prod) => {
    // if (!products.length) {
    //     products.push(Object.assign({}, prod, { id: 1 }));
    // } else {
    //     products.push(
    //         Object.assign({}, prod, {
    //             id: products[products.length - 1].id + 1,
    //         })
    //     );
    // } 
    products.push(Object.assign({}, prod));
    knex('productos').insert(products)
    .then(()=>console.log("Producto sumado"))
    .catch(err=>{console.log(err); throw err})
    // .finally(()=>{knex.destroy()})
}

