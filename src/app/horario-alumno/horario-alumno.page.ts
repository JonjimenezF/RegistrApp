import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { alumno } from '../models/alumno';
import { carrera } from '../models/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/userservice/users.service';
import { catchError, lastValueFrom } from 'rxjs';
import { asignatura } from '../models/asignatura';
import { horario } from '../models/horario';


@Component({
  selector: 'app-horario-alumno',
  templateUrl: './horario-alumno.page.html',
  styleUrls: ['./horario-alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HorarioAlumnoPage implements OnInit {


  userInfo?: alumno;
  userAsignatura?: asignatura[] = [];
  userHorario?: horario[] | undefined = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UsersService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userInfo']) {
      this.userInfo = state['userInfo'];
    }
  }

  async ngOnInit() {


    console.log(this.userInfo);
    //

    //
    const user_asignatura = await lastValueFrom(this.userService.getAsignaturas(this.userInfo?.Rut));
    console.log(user_asignatura);
    this.userAsignatura = user_asignatura;


    if (this.userAsignatura) {
      this.userHorario = []; // Inicializar el array antes de agregar horarios
      for (const asignatura of this.userAsignatura) {
        const user_horario = await lastValueFrom(this.userService.getHorario(asignatura.id_asignatura));
        console.log(user_horario);
        this.userHorario = this.userHorario.concat(user_horario); // Agregar los horarios al array existente
        if (this.userHorario) {
          this.userHorario.sort((a, b) => {
            // Ordenar por el día de la semana (puedes personalizar el orden según tus necesidades)
            const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            return diasSemana.indexOf(a.dia_semana) - diasSemana.indexOf(b.dia_semana);
          });
  
          for (const horario of this.userHorario) {
            console.log(horario.dia_semana);
          }
        }
      }
    } else {
      console.log('error');
    }
    

  }

  getHorariosByAsignatura(idAsignatura: number) {
    return this.userHorario?.filter(horario => horario.id_asignatura === idAsignatura) ?? [];
  }


}

