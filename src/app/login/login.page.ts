import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Alumno } from '../models/alumno';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  ListUsuario: Alumno[] = [
    new Alumno('12345678-k', 'Pedro', 'Perez', '20/03/1997', 'Ing informatica', 'pe.perez@duocuc.cl', 'Vespertino', 'base de dato', '123'),
    new Alumno('87654321-k', 'Matias', 'Varga', '25/12/1990', 'Redes y comunicacion', 'ma.vargas@duocuc.cl', 'Diurno', 'Matematica aplicada', '123'),
  ];

  user = {
    usuario: "",
    password: ""
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    for (let i = 0; i < this.ListUsuario.length; i++) {
      if (this.ListUsuario[i].correoElectronico === this.user.usuario && this.ListUsuario[i].contrasena == this.user.password) {
        console.log(this.ListUsuario[i]);
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.ListUsuario[i]
          }
        }
        this.router.navigate(['/home'], navigationExtras);
      }

    }
  }
}
