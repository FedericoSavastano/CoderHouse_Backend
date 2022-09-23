import express from 'express';
import mascotas from './mascotas.js';
import personas from './personas.js';

const app = express();
const {json} = express;
const {urlencoded} = express;
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static('./public'))

app.use('/api', mascotas);
app.use('/api', personas);


app.listen(8080, (err)=>{
    if(err) console.log(err)

    console.log("Listening on port 8080")
})

