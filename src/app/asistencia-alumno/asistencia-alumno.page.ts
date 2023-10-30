import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { alumno } from '../models/alumno';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/userservice/users.service';
import { registroAsistencia } from '../models/registroAsistencia';
import { catchError, lastValueFrom } from 'rxjs';
import { seccion } from '../models/seccion';
import { horario } from '../models/horario';
import { asignatura } from '../models/asignatura';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AsistenciaAlumnoPage implements OnInit {

  userInfo?: alumno;
  userRegistro?: registroAsistencia[] | undefined = [];
  userSeccion?: seccion [] = [];
  userHorario?: horario [] = [];
  userAsignatura?: asignatura [] = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UsersService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userInfo']) {
      this.userInfo = state['userInfo'];
    }
  }
  async ngOnInit() {
    
    console.log(this.userInfo);
    const user_RegistroAsis = await lastValueFrom(this.userService.getRegistroAsistencia(this.userInfo?.Rut));
    console.log(user_RegistroAsis);
    this.userRegistro = user_RegistroAsis;
    //
    



    if(this.userRegistro){
      for(const registro of this.userRegistro){
        console.log(registro.id_seccion)
        const user_Seccion = await lastValueFrom(this.userService.getSeccion(registro.id_seccion));
        this.userSeccion = user_Seccion;
        if(this.userSeccion){
          for(const seccion of this.userSeccion){
            console.log(seccion.id_horario);
            const user_Horario = await lastValueFrom(this.userService.getHorarioAsis(seccion.id_horario));
            this.userHorario = user_Horario;
          }
          if(this.userHorario){
            for(const horario of this.userHorario){
              console.log(horario.id_sala);
              const user_Asignatura = await lastValueFrom(this.userService.getAsignaturasHorario(horario.id_asignatura));
              this.userAsignatura = user_Asignatura; 
              console.log(this.userAsignatura);
            }
            if(this.userAsignatura){
              for(const asignatura of this.userAsignatura){
                console.log(asignatura.nombre_asignatura);
              }
            }
          }
        }
      }
    }  
  }

  async cambiarAsistencia(idAsistencia: number, estado_asistencia:string) {
    console.log('Función cambiarAsistencia llamada.');
    console.log(`ID Asistencia: ${idAsistencia}, Estado de Asistencia: ${estado_asistencia}`);
    const response = await lastValueFrom(this.userService.putRegistroAsistenciaActuali(idAsistencia,estado_asistencia));
    console.log(response)
  }

}


