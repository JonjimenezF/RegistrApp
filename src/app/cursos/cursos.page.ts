import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Alumno } from '../models/alumno';
import { carrera } from '../models/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/userservice/users.service';
import { catchError, lastValueFrom } from 'rxjs';
import { Asignatura } from '../models/asignatura';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CursosPage implements OnInit {

  userInfo?: Alumno;
  userCarrera?: carrera;
  userAsignatura?:Asignatura[] = [];

  constructor(private router: Router, private activateRoute: ActivatedRoute,private userService:UsersService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userInfo']) {
      this.userInfo = state['userInfo'];
    }
  }

  async ngOnInit() {
    console.log(this.userInfo);
    //
    const user_carrera = await lastValueFrom(this.userService.getCarrera(this.userInfo?.id_carrera));
    console.log(user_carrera); 
    this.userCarrera = user_carrera;
    //
    const user_asignatura = await lastValueFrom(this.userService.getAsignaturas(this.userInfo?.Rut));
    console.log(user_asignatura); 
    this.userAsignatura = user_asignatura;
  }
  
}