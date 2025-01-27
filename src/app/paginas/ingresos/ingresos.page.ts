import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresoFormComponent } from './ingreso-form/ingreso-form.component';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonBackButton,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { PublicacionService } from 'src/app/servicio/publicacion.service';
import { Publicacion } from 'src/app/modelo/publicacion';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IngresoFormComponent,
  ],
})
export class IngresosPage implements OnInit {
  publicaciones: Publicacion[] = [];
  constructor(private publicacionService: PublicacionService) {
  }

  async ngOnInit() {
    await this.publicacionService.iniciarPlugin();
    await this._actualizar();
  }

  async _actualizar() {
    this.publicaciones = await this.publicacionService.getPublicaciones();
  }

  async agregarPublicacion($event: Publicacion) {
    const publicacion: Publicacion = {
      titulo: $event.titulo,
      descripcion: $event.descripcion,
      fecha: $event.fecha,
      foto: $event.foto,
    };
    await this.publicacionService.addPublicacion(publicacion);
    await this._actualizar();
  }
}
