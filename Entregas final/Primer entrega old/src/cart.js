import express from 'express';
 
import { Contenedor } from './contenedor.js';
const {Router} = express;
const router = Router();

// let products = [];

let fileRoute = './cart.txt';

let myCart = new Contenedor(fileRoute)
 

router.get('/', (req, res) => {
    myCart.getAll()   
    .then(e => res.send(e))
    .catch(error => console.log(error))

    // res.send(products);
})

router.get('/:id', (req, res) => {
    myCart.getById(parseInt(req.params.id))   
    .then(e => res.send(e))
    .catch(error => console.log(error))
    // let productSelected = products.find(product => product.id === parseInt(req.params.id));
    // if(!productSelected)
    //     res.send(`There is no product with id ${req.params.id}`);

    // res.send(productSelected);
})

router.post('/', (req, res)=>{
    myCart.save(req.body)
    .then(e => res.send(e))
    .catch(error => console.log(error))
    
})

router.put('/:id', (req, res)=>{

    myCart.editById(parseInt(req.params.id), req.body)    
    .then(e => res.send(e))
    .catch(error => console.log(error))

//    let indexOfProductSelected = products.findIndex(product => product.id === parseInt(req.params.id))
 
//    if(!indexOfProductSelected) 
//         res.send(`There is no product with id ${req.params.id}`)

//    req.body.price ? products[indexOfProductSelected].price = req.body.price : null;
//    req.body.title ? products[indexOfProductSelected].title = req.body.title : null;
//    req.body.thumbnail ? products[indexOfProductSelected].thumbnail = req.body.thumbnail : null;

//    res.send(`Product with Id ${req.params.id} was updated`)
})

router.delete('/:id', (req, res)=>{
    let indexOfProductSelected = products.findIndex(product => product.id === parseInt(req.params.id))
 
    if(!indexOfProductSelected) 
        res.send(`There is no product with id ${req.params.id}`)

    products.splice(indexOfProductSelected, 1)
    res.send(`Product with Id ${req.params.id} was deleted`)
    
})

export default router;