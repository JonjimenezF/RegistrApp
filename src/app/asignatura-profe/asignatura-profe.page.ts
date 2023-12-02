import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from '../models/profesor';
import { UsersService } from '../services/userservice/users.service';
import { lastValueFrom } from 'rxjs';
import { clase } from '../models/clase';

@Component({
  selector: 'app-asignatura-profe',
  templateUrl: './asignatura-profe.page.html',
  styleUrls: ['./asignatura-profe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AsignaturaProfePage implements OnInit {
  userInfo?: Profesor;
  userClase?: clase
    constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UsersService) {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state && state['userInfo']) {
        this.userInfo = state['userInfo'];
      }
    }
  
    async ngOnInit() {
      console.log(this.userInfo)
      const user_clase = await lastValueFrom(this.userService.getClase(this.userInfo?.Rut));
      console.log(user_clase)
      this.userClase = user_clase
    }

  home(){
    this.router.navigate(['/qr'], {state: {userclase: this.userClase } });
  }
}
