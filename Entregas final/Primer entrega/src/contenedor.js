// const fs = require("fs");
import fs from 'fs';

class Contenedor {
    constructor(fileRoute){
        this.fileRoute = fileRoute;
    }

    async  #readMyFile() {
        try {
           if(fs.existsSync(this.fileRoute)) {
                let fileContent = await fs.promises.readFile(this.fileRoute, 'utf-8');
                let fileContentParsed = await JSON.parse(fileContent);
                return fileContentParsed;
           } else {
                fs.promises.writeFile(this.fileRoute, JSON.stringify('[]', null, '\t'));
                return [];
           }
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj){
        try {
            let fileContent = await this.#readMyFile();
            obj.id = await this.#getLastId() + 1;
            obj.timestamp = Date.now();
            await fileContent.push(obj);
            await fs.promises.writeFile(this.fileRoute, JSON.stringify(fileContent, null, '\t'));
            return `your new element is saved under the id : ${obj.id}`;
        } catch (error) {
            console.log(error);
        }
    }

    async #getLastId() {
        try {
            let fileContent = await this.#readMyFile();
            if(fileContent[0].id) {
                let lastId = await fileContent.at(-1).id; 
                return lastId;
            } else {
                return Number(0);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getById(num){
       try {
            let contentSelected ;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach(content => {if(content.id === num) contentSelected = content});
            return contentSelected ? contentSelected : `There is no item with the id ${num}`;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            let fileContent = await this.#readMyFile();
            return fileContent;
        } catch (error) {
            console.log(error);
        }
    }

    async editById(num, obj){
        try {
            let contentSelected;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach(content => {if(content.id === num) contentSelected = content});
             if (contentSelected) {
                let indexOfProductSelected = fileContent.indexOf(contentSelected);
             
                for (const property in obj){
                    if(fileContent[indexOfProductSelected].hasOwnProperty(property))
                    {
                        fileContent[indexOfProductSelected][property] =  obj[property]
                    }
                }

                await fs.promises.writeFile(this.fileRoute, JSON.stringify(fileContent, null, '\t'));
                return `you edited the element under the id : ${num}`;
            } else {
                return `the element with id : ${num} could not be edited because it was not in the file`;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(num){
        try {
            let contentSelected;
            let fileContent = await this.#readMyFile();
            await fileContent.forEach(content => {if(content.id === num) contentSelected = content});
            if (contentSelected) {
                await fileContent.splice(fileContent.indexOf(contentSelected), 1);
                await fs.promises.writeFile(this.fileRoute, JSON.stringify(fileContent, null, '\t'));
                return `you deleted the element under the id : ${num}`;
            } else {
                return `the element with id : ${num} could not be deleted because it was not in the file`;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try {
            if (fs.existsSync(this.fileRoute)) {
                await fs.promises.unlink(this.fileRoute);
                return "File was deleted"
            } else {
                return "File does not exist";
            }
        } catch (error) {
            console.log(error);
        }
    }
}



const productList = [
    {
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    },
    {
      "title": "Calculadora",
      "price": 234.56,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    },
    {
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    }
   ]


   const fileRoute = "./productos.txt"
   const myFile = new Contenedor(fileRoute);



   async function loadProducts () {
    try{
        for (const product of productList) {
            await myFile.save(product);
        }
    } catch(err) {
        console.log(err)
    }
  }
   
  
    // loadProducts();
    
    export {Contenedor, fileRoute, loadProducts}

 




 