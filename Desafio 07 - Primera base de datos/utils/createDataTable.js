import {dbConnection}  from '../database/config.js';
 
import knex from 'knex';

 

// knex(options);

const createDataBases = async () => {
    const knexProd = knex(dbConnection.mysql)
   await knexProd.schema.createTable('productos', table => {
        table.increments('id')
        table.string('title')
         table.integer('price')
          table.string('thumbnail')
    })
    .then(()=>{console.log("Tabla para productos creada")})
    .catch((err)=>{console.log(err); throw err})
    .finally(()=> knexProd.destroy())
     

    const knexChat= knex(dbConnection.sqlite)
    await  knexChat.schema.createTable('chat', table => {
        table.increments('id')
        table.string('text')
          table.string('author')
    }).then(()=>{console.log("Tabla para chat creada")})
    .catch((err)=>{console.log(err); throw err})
    .finally(()=> knexChat.destroy())
    
}


createDataBases() 
 