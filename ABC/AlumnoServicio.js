const Alumno = require('./Alumno');

class AlumnoServicio {
    constructor() {
        this.alumnos = [];
        this.nextId = 1;
    }

    listar() {
        console.log('\n=== ALUMNOS ===');
        if (this.alumnos.length === 0) {
            console.log('No hay alumnos');
            return;
        }
        this.alumnos.forEach(a => {
            console.log(`${a.id}. ${a.nombre} - ${a.email}`);
        });
    }

    agregar(nombre, email) {
        const alumno = new Alumno(this.nextId++, nombre, email);
        this.alumnos.push(alumno);
        console.log('Alumno agregado');
        return alumno;
    }

    obtener(id) {
        return this.alumnos.find(a => a.id === id);
    }

    modificar(id, nombre, email) {
        const alumno = this.obtener(id);
        if (alumno) {
            alumno.nombre = nombre;
            alumno.email = email;
            console.log('Alumno modificado');
            return true;
        }
        console.log('Alumno no encontrado');
        return false;
    }

    eliminar(id) {
        const index = this.alumnos.findIndex(a => a.id === id);
        if (index > -1) {
            this.alumnos.splice(index, 1);
            console.log('Alumno eliminado');
            return true;
        }
        console.log('Alumno no encontrado');
        return false;
    }

    obtenerTodos() {
        return this.alumnos;
    }
}

module.exports = AlumnoServicio;