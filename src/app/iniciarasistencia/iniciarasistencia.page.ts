import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-iniciarasistencia',
  templateUrl: './iniciarasistencia.page.html',
  styleUrls: ['./iniciarasistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IniciarasistenciaPage implements OnInit {

  constructor() { }

  json = { 
      "fecha": "2023-11-25",
      "hora": "22:00",
      "estado_asistencia": "Ausente",
      "id_seccion": "1",
      "rut_alumno": "12345678-1",
      "rut_profesor": "11243145-1"
  }


  ngOnInit() {
    console.log(this.convertir())
  }

  convertir(){
    return JSON.stringify(this.json)
    
  }

}
