import express from 'express';
import products from './products.js'


const app = express();
const {json, urlencoded } = express;
app.use(json())
app.use(urlencoded({extended: true}));
app.use(express.static('./public'));

app.use('/api/products', products);

const PORT = 8080;
app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log(`Listening on port ${PORT}`)
})