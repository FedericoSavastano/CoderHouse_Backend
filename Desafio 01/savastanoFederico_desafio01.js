class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor})
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre)
    }
}

const persona1 = new Usuario("Ricardo", "Fort");

console.log(persona1.getFullName());

persona1.addMascota("perro");
persona1.addMascota("gato");

console.log(persona1.countMascotas());

persona1.addBook("El color de la magia", "Terry Pratchett");
persona1.addBook("El fin de la infancia", "Arthur C. Clarke");

console.log(persona1.getBookNames());