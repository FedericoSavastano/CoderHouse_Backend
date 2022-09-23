import express from 'express';
const {Router} = express;
const router = Router();

let personas = [
    {nombre: "Lol", apellido: "Tun", edad: 32 },
    {nombre: "Cht", apellido: "Ñic", edad: 63 }
];

router.get('/personas', (req, res)=>{
    res.send(personas)
})

router.post('/personas', (req, res)=>{
    personas.push(req.body)
    res.send("Guardado")
})


export default router;