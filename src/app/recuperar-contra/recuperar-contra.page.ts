import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarContraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
