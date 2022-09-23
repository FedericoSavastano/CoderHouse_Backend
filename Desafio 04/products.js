import express from 'express';
const {Router} = express;
const router = Router();

let products = [];

router.get('/', (req, res) => {
    res.send(products);
})

router.get('/:id', (req, res) => {
    let productSelected = products.find(product => product.id === parseInt(req.params.id));
    if(!productSelected)
        res.send(`There is no product with id ${req.params.id}`);

    res.send(productSelected);
})

router.post('/', (req, res)=>{
    if(!products.length) {
        products.push(Object.assign({}, req.body, {id: 1}))
        res.send("Product saved with Id of 1")
    } else {
        products.push(Object.assign({}, req.body, {id: products[products.length -1].id + 1}));
        res.send(`Product saved with Id of ${products[products.length -1].id}`)
    }
})

router.put('/:id', (req, res)=>{

   let indexOfProductSelected = products.findIndex(product => product.id === parseInt(req.params.id))
 
   if(!indexOfProductSelected) 
        res.send(`There is no product with id ${req.params.id}`)

   req.body.price ? products[indexOfProductSelected].price = req.body.price : null;
   req.body.title ? products[indexOfProductSelected].title = req.body.title : null;
   req.body.thumbnail ? products[indexOfProductSelected].thumbnail = req.body.thumbnail : null;

   res.send(`Product with Id ${req.params.id} was updated`)
})

router.delete('/:id', (req, res)=>{
    let indexOfProductSelected = products.findIndex(product => product.id === parseInt(req.params.id))
 
    if(!indexOfProductSelected) 
        res.send(`There is no product with id ${req.params.id}`)

    products.splice(indexOfProductSelected, 1)
    res.send(`Product with Id ${req.params.id} was deleted`)
    
})

export default router;