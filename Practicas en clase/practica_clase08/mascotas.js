import express from 'express';
const {Router} = express;
const router = Router();

let mascotas = [
    {nombre: "Clemen", raza: "gato", edad: 2 },
    {nombre: "Bebu", raza: "gata", edad: 3 }
];

router.get('/mascotas', (req, res)=>{
    res.send(mascotas)
})

router.post('/mascotas', (req, res)=>{
    mascotas.push(req.body)
    res.send("Guardado")
})


export default router;