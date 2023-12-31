import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from '../models/profesor';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.page.html',
  styleUrls: ['./perfil-profesor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerfilProfesorPage implements OnInit {
    
  userInfo?: Profesor;
    constructor(private router: Router, private activateRoute: ActivatedRoute) {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state && state['userInfo']) {
        this.userInfo = state['userInfo'];
      }
    }  
  
    ngOnInit() {
      console.log(this.userInfo)
    }
}
