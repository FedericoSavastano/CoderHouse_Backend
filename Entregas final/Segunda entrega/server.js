import express from 'express';
import products from './src/products.js';
import cart from './src/cart.js';

const app = express();
const {json, urlencoded} = express;
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static('./public'))

app.use('/api/productos', products);
app.use('/api/carrito', cart);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log(`Listening on port ${PORT}`)
})