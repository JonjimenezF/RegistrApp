import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { clase } from '../models/clase';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/userservice/users.service';
import { lastValueFrom } from 'rxjs';
import { seccion } from '../models/seccion';
import { horario } from '../models/horario';
import { asignatura } from '../models/asignatura';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QRPage implements OnInit {
  urlCodigoQR: string | undefined;
  fechaActual: string | undefined;
  horaActual: string | undefined;

  userSeccion?: seccion[] = [];
  userHorario?: horario[] = [];
  userAsignatura?: asignatura[] = [];
  userAsignaturacodigo?: asignatura[] | undefined = [];

  userclase: clase | undefined;
  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UsersService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userclase']) {
      this.userclase = state['userclase'];
    }
    this.obtenerFechaYHoraActual();
  }

  async ngOnInit() {
    console.log(this.userclase)
    console.log(this.convertir())
    console.log(this.fechaActual)
    console.log(this.horaActual)

    const user_seccion = await lastValueFrom(this.userService.getSeccion(this.userclase?.id_seccion));
    this.userSeccion = user_seccion;
    console.log(this.userSeccion)
    if (this.userSeccion) {
      for (const seccion of this.userSeccion) {
        console.log("hola", seccion.id_horario)
        const user_Horario = await lastValueFrom(this.userService.getHorarioAsis(seccion.id_horario))
        this.userHorario = user_Horario
        console.log(this.userHorario)
      }
      if (this.userHorario) {
        for (const horario of this.userHorario) {
          const user_Asignatura = await lastValueFrom(this.userService.getAsignaturasHorario(horario.id_asignatura))
          this.userAsignatura = user_Asignatura
          console.log(this.userAsignatura)
        }
        if (this.userAsignatura) {
          for (const asignatura of this.userAsignatura) {
            const user_Asignaturas_codigo = await lastValueFrom(this.userService.getAsignaturaCod(asignatura.codigo_asignatura))
            this.userAsignaturacodigo = user_Asignaturas_codigo
            console.log(this.userAsignaturacodigo)
            if (this.userAsignaturacodigo) {
              for (let i = 0; i < this.userAsignaturacodigo.length; i++) {
                const alumno = this.userAsignaturacodigo[i];
                console.log(alumno);
                const response = await lastValueFrom(this.userService.postAsistencia(this.horaActual, this.fechaActual, "Ausente", this.userclase?.id_clase, alumno.rut_alumno));
              }
            }
          }

        }
      }
    }

  }

  obtenerFechaYHoraActual() {
    // Obteniendo la fecha y hora actual
    const fechaHoraActual = new Date();

    // Formateando la fecha según tus necesidades
    const year = fechaHoraActual.getFullYear();
    const month = this.padZero(fechaHoraActual.getMonth() + 1);
    const day = this.padZero(fechaHoraActual.getDate());

    this.fechaActual = `${day}-${month}-${year}`;

    // Formateando la hora según tus necesidades
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    };

    this.horaActual = fechaHoraActual.toLocaleTimeString('es-ES', opcionesHora);
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }




  // convertir(){
  //   return JSON.stringify(this.json)

  // }

  convertir() {
    // Agregar la fecha y la hora actual al objeto JSON
    const jsonConFechaHora = {
      // fechaActual: this.fechaActual,
      // horaActual: this.horaActual,
      id_seccion: this.userclase?.id_seccion,
      id_clase: this.userclase?.id_clase
    };

    // Convertir a cadena JSON
    this.urlCodigoQR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify(jsonConFechaHora))}`;
    console.log(this.urlCodigoQR);
  }


  vistaprofe(){
    this.router.navigate(['/vista-profe']);
  }

}
