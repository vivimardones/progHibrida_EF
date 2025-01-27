import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonButton, IonIcon,
  IonFab, IonFabButton, 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CitasService } from '../../servicio/citas.service';
import { addIcons } from 'ionicons'
import { settingsOutline, addOutline } from 'ionicons/icons'
import { RouterModule } from '@angular/router';
import { Citas } from 'src/app/modelo/citas';

@Component({
  selector: 'app-cita',
  templateUrl: './cita-aleatoria.page.html',
  styleUrls: ['./cita-aleatoria.page.scss'],
  standalone: true,
  imports: [RouterModule, IonContent, IonHeader, IonTitle, 
    IonToolbar, IonCard, IonCardHeader, 
    IonFab, IonFabButton,
    IonCardTitle, IonCardContent, CommonModule, FormsModule, 
    IonButtons, IonButton, IonIcon]
})
export class CitaAleatoriaPage implements OnInit {
  citaAleatoria: Citas | null = null;

  constructor(private citasService: CitasService) {
      addIcons({settingsOutline,addOutline});
   }

  async ngOnInit() {
    await this.citasService.iniciarPlugin();
    await this._actualizar()
  }
  
  async _actualizar() {
    this.citaAleatoria = await this.citasService.getCitaAleatoria();
  }
  
}
