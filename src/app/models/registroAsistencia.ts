export class registroAsistencia {
    constructor(
        public fecha: string | undefined,
        public hora: string | undefined,
        public estado_asistencia: string | undefined,
        public id_clase: number | undefined,
        public rut_alumno: string | undefined,
    ) {}
}
