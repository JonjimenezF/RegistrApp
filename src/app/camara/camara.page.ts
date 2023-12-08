import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CamaraPage implements OnInit  {
  constructor(private toastController: ToastController) {}

  ngOnInit(){
    
  }
  async escanearCodigoQR() {
    try {
      const result = await BarcodeScanner.startScan();
      console.log('Resultado del escaneo:', result);
      
      if (result.hasContent) {
        this.mostrarToast(`Contenido del código QR: ${result.content}`);
      } else {
        this.mostrarToast('No se encontró contenido en el código QR.');
      }

    } catch (error) {
      console.error('Error al escanear el código QR:', error);
      this.mostrarToast('Error al escanear el código QR. Por favor, inténtalo de nuevo.');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom',
    });
    toast.present();
  }
}

