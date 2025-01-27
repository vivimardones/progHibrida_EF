import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PublicacionService } from 'src/app/servicio/publicacion.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { ListaPublicacionComponent } from './lista-publicacion/lista-publicacion.component';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ListaPublicacionComponent,
  ],
})
export class PublicacionPage implements OnInit {
  publicaciones: Publicacion[] = [];
  constructor(private publicacionService: PublicacionService) {}

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
