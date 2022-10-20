// import {options as mariaDBOptions}  from './options/mariaDB.js';
// import {options as sqlite3Options} from './options/sqlite3.js';
// import knex from 'knex';

 

// // knex(options);

// const createDataBases = async () => {
//    await knex(mariaDBOptions).schema.createTable('productos', table => {
//         table.increments('id')
//         table.string('title')
//          table.integer('price')
//           table.string('thumbnail')
//     }).then(()=>{console.log("Tabla creada")})
     


//     await  knex(sqlite3Options).schema.createTable('chat', table => {
//         table.increments('id')
//         table.string('text')
//           table.string('author')
//     }).then(()=>{console.log("Tabla creada")})
    
// }


// createDataBases().then(()=>console.log("Tablas creadas"))



import express from 'express';
const { Router } = express;
const router = Router();
import { containerProducts } from './containers/containerProducts.js'

 

router.get('/', async (req, res) => {
 try {
    res.status(200).json({ data: await containerProducts.getProducts()})
 } catch (error) {
    console.log(error);
    res.status(400).json({msg: 'No hay productos cargados', error: error})
 }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await containerProducts.getProductById(parseInt(req.params.id));

        res.status(200).json({ data: product[0]})
        
     } catch (error) {
        console.log(error);
        res.status(400).json({msg: `Error: ${error}` })
     }
});

router.post('/', async (req, res) => {
    const {title, price, thumbnail} = req.body;

    if(title && price && thumbnail ){
        await containerProducts.addProduct({title, price, thumbnail})
        res.status(200).json({msg: "producto agregado"})
    }
    try {
        const product = await containerProducts.addProduct(parseInt(req.params.id));

        res.status(200).json({ data: product[0]})
        
     } catch (error) {
        console.log(error);
        res.status(400).json({msg: `Error: ${error}` })
     }
    // if (!products.length) {
    //     products.push(Object.assign({}, req.body, { id: 1 }));
    // } else {
    //     products.push(
    //         Object.assign({}, req.body, {
    //             id: products[products.length - 1].id + 1,
    //         })
    //     );
    // }
 
    // res.render('home', {
    //     newProductSaved: true,
    //     title: products[products.length - 1].title,
    //     id: products[products.length - 1].id,
    // });
});

// router.get('/productos', (req, res) => {
//     res.render('list', {
//         productsExist: products.length,
//         products: products,
//     });
// });


//otros metodos
// router.get('/:id', (req, res) => {
//     let productSelected = products.find(
//         (product) => product.id === parseInt(req.params.id)
//     );
//     if (!productSelected)
//         res.send(`There is no product with id ${req.params.id}`);

//     res.send(productSelected);
// });

// router.put('/:id', (req, res) => {
//     let indexOfProductSelected = products.findIndex(
//         (product) => product.id === parseInt(req.params.id)
//     );

//     if (!indexOfProductSelected)
//         res.send(`There is no product with id ${req.params.id}`);

//     req.body.price
//         ? (products[indexOfProductSelected].price = req.body.price)
//         : null;
//     req.body.title
//         ? (products[indexOfProductSelected].title = req.body.title)
//         : null;
//     req.body.thumbnail
//         ? (products[indexOfProductSelected].thumbnail = req.body.thumbnail)
//         : null;

//     res.send(`Product with Id ${req.params.id} was updated`);
// });

// router.delete('/:id', (req, res) => {
//     let indexOfProductSelected = products.findIndex(
//         (product) => product.id === parseInt(req.params.id)
//     );

//     if (!indexOfProductSelected)
//         res.send(`There is no product with id ${req.params.id}`);

//     products.splice(indexOfProductSelected, 1);
//     res.send(`Product with Id ${req.params.id} was deleted`);
// });

export default router;
