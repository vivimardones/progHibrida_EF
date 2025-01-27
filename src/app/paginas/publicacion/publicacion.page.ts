import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionService } from 'src/app/servicio/publicacion.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { ListaPublicacionComponent } from './lista-publicacion/lista-publicacion.component';
import { IonButtons, IonButton, IonIcon,
  IonFab, IonFabButton, 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons'
import { settingsOutline, addOutline } from 'ionicons/icons'
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonButtons, IonButton, IonIcon, IonFab, IonFabButton, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent,
    CommonModule,
    FormsModule,
    ListaPublicacionComponent,
  ],
})
export class PublicacionPage implements OnInit {
  publicaciones: Publicacion[] = [];
  constructor(private publicacionService: PublicacionService) {
    addIcons({settingsOutline,addOutline});
  }

  async ngOnInit() {
    await this.publicacionService.iniciarPlugin();
    await this._actualizar();
  }
  
  async _actualizar() {
    this.publicaciones = await this.publicacionService.getPublicaciones();
  }
  

  async borrarPublicacion(index: number) {
    await this.publicacionService.deletePublicacion(index);
    await this._actualizar();
  }
}
