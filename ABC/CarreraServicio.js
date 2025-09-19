const Carrera = require('./Carrera.js');

class CarreraServicio {
    constructor() {
        this.carreras = [];
        this.nextId = 1;
    }

    listar() {
        console.log('\n=== CARRERAS ===');
        if (this.carreras.length === 0) {
            console.log('No hay carreras');
            return;
        }
        this.carreras.forEach(c => {
            console.log(`${c.id}. ${c.nombre} - ${c.duracion} años`);
        });
    }

    agregar(nombre, duracion) {
        const carrera = new Carrera(this.nextId++, nombre, duracion);
        this.carreras.push(carrera);
        console.log('Carrera agregada');
        return carrera;
    }

    obtener(id) {
        return this.carreras.find(c => c.id === id);
    }

    modificar(id, nombre, duracion) {
        const carrera = this.obtener(id);
        if (carrera) {
            carrera.nombre = nombre;
            carrera.duracion = duracion;
            console.log('Carrera modificada');
            return true;
        }
        console.log('Carrera no encontrada');
        return false;
    }

    eliminar(id) {
        const index = this.carreras.findIndex(c => c.id === id);
        if (index > -1) {
            this.carreras.splice(index, 1);
            console.log('Carrera eliminada');
            return true;
        }
        console.log('Carrera no encontrada');
        return false;
    }

    obtenerTodas() {
        return this.carreras;
    }
}

module.exports = CarreraServicio;