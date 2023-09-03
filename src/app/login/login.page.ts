import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  listUsuario: []=[

  ];

  user={
    email:"",
    password:""
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }


  // ingresar(){
  //   for(let i = 0 < this.listUsuario.length; i++){
  //      if(this.listUsuario[i]. === this.user.email && this.listUsuario[i]. === this.user.password){
  //       let navigationExtras: NavigationExtras = {
  //         state: {
  //           user: this.listUsuario[i]
  //         }
  //       }
  //      }
  //   }

  // }

}
