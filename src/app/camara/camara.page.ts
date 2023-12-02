import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router'; // Add ActivatedRoute import
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CamaraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async scanBarcode() {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      BarcodeScanner.hideBackground(); // hacer el fondo transparente

      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content); // procesar el contenido del código escaneado
      }
    } else {
      // manejar el caso en que no se concedan permisos
    }
  }
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
}

