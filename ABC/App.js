const readline = require('readline');
const AlumnoServicio = require('./AlumnoServicio.js');
const CarreraServicio = require('./CarreraServicio.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pregunta = (mensaje) => {
    return new Promise(resolve => {
        rl.question(mensaje, resolve);
    });
};

const alumnoServicio = new AlumnoServicio();
const carreraServicio = new CarreraServicio();

async function menuPrincipal() {
    console.log('\n=== SISTEMA ABC ===');
    console.log('1. Gestionar Alumnos');
    console.log('2. Gestionar Carreras');
    console.log('3. Asignar Alumno a Carrera');
    console.log('4. Salir');
    
    const opcion = await pregunta('Opción: ');
    return parseInt(opcion);
}

async function gestionarAlumnos() {
    console.log('\n=== ALUMNOS ===');
    console.log('1. Ver Alumnos');
    console.log('2. Agregar');
    console.log('3. Modificar');
    console.log('4. Eliminar');
    console.log('5. Volver');
    
    const opcion = parseInt(await pregunta('Opción: '));
    
    switch (opcion) {
        case 1:
            alumnoServicio.listar();
            break;
        case 2:
            const nombre = await pregunta('Nombre: ');
            const email = await pregunta('Email: ');
            alumnoServicio.agregar(nombre, email);
            break;
        case 3:
            alumnoServicio.listar();
            const idMod = parseInt(await pregunta('ID a modificar: '));
            const nuevoNombre = await pregunta('Nuevo nombre: ');
            const nuevoEmail = await pregunta('Nuevo email: ');
            alumnoServicio.modificar(idMod, nuevoNombre, nuevoEmail);
            break;
        case 4:
            alumnoServicio.listar();
            const idElim = parseInt(await pregunta('ID a eliminar: '));
            alumnoServicio.eliminar(idElim);
            break;
        case 5:
            return;
    }
    
    if (opcion !== 5) {
        await gestionarAlumnos();
    }
}

async function gestionarCarreras() {
    console.log('\n=== CARRERAS ===');
    console.log('1. Ver Carreras');
    console.log('2. Agregar');
    console.log('3. Modificar');
    console.log('4. Eliminar');
    console.log('5. Volver');
    
    const opcion = parseInt(await pregunta('Opción: '));
    
    switch (opcion) {
        case 1:
            carreraServicio.listar();
            break;
        case 2:
            const nombre = await pregunta('Nombre: ');
            const duracion = parseInt(await pregunta('Duración (años): '));
            carreraServicio.agregar(nombre, duracion);
            break;
        case 3:
            carreraServicio.listar();
            const idMod = parseInt(await pregunta('ID a modificar: '));
            const nuevoNombre = await pregunta('Nuevo nombre: ');
            const nuevaDuracion = parseInt(await pregunta('Nueva duración: '));
            carreraServicio.modificar(idMod, nuevoNombre, nuevaDuracion);
            break;
        case 4:
            carreraServicio.listar();
            const idElim = parseInt(await pregunta('ID a eliminar: '));
            carreraServicio.eliminar(idElim);
            break;
        case 5:
            return;
    }
    
    if (opcion !== 5) {
        await gestionarCarreras();
    }
}

async function asignarAlumnoCarrera() {
    alumnoServicio.listar();
    const alumnoId = parseInt(await pregunta('ID del alumno: '));
    
    carreraServicio.listar();
    const carreraId = parseInt(await pregunta('ID de la carrera: '));
    
    const alumno = alumnoServicio.obtener(alumnoId);
    const carrera = carreraServicio.obtener(carreraId);
    
    if (alumno && carrera) {
        alumno.carreraId = carreraId;
        console.log(`${alumno.nombre} asignado a ${carrera.nombre}`);
    } else {
        console.log('Alumno o carrera no encontrados');
    }
}

async function iniciar() {
    console.log('¡Bienvenido al Sistema ABC!');
    
    let continuar = true;
    while (continuar) {
        const opcion = await menuPrincipal();
        
        switch (opcion) {
            case 1:
                await gestionarAlumnos();
                break;
            case 2:
                await gestionarCarreras();
                break;
            case 3:
                await asignarAlumnoCarrera();
                break;
            case 4:
                continuar = false;
                console.log('¡Adiós!');
                break;
            default:
                console.log('Opción inválida');
        }
    }
    
    rl.close();
}

iniciar();