export class Alumno {
    constructor(
        public rut: string,
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public carrera: string,
        public correoElectronico: string,
        public horario: string,
        public asignatura: string,
        public contrasena: string
    ) {}
}

