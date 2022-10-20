import  knex  from 'knex';

export class containerProducts {
    constructor(configConnection, table){
        this.knex = knex(configConnection);
        this.table = table;
    }

    async getProducts() {
        try {
            return await this.knex.from(this.table).select('*')
        }catch(error){
            return new Error(`Error: ${error}`)
        }
    }

    async getProductById(id) {
        try {
            return await this.knex.from(this.table).select('*').where('id', '=', parseInt(id))
        }catch(error){
            return new Error(`Error: ${error}`)
        }
    }

    async addProduct(product) {
        try {
            return await this.knex.from(this.table).insert(product) 
        }catch(error){
            return new Error(`Error: ${error}`)
        }
    }

    async getProductById(id, product) {
        try {
            return await this.knex.from(this.table).where('id', '=', parseInt(id)).update(product)
        }catch(error){
            return new Error(`Error: ${error}`)
        }
    }

    async deleteProduct(id) {
        try {
            return await this.knex.from(this.table).where('id', '=', parseInt(id)).del()
        }catch(error){
            return new Error(`Error: ${error}`)
        }
    }

    async deleteAllProducts() {
        try {
            return await this.knex(this.table).del()
        }catch(error){
            return new Error(`Error: ${error}`)
        }
    }
}


 