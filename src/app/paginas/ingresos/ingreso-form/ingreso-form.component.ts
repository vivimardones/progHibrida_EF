import { Component, EventEmitter, Output } from '@angular/core';
import { PublicacionService } from 'src/app/servicio/publicacion.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ingreso-form',
  templateUrl: './ingreso-form.component.html',
  styleUrls: ['./ingreso-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class IngresoFormComponent {
  fecha: Date;

  @Output() publicar = new EventEmitter<Publicacion>();
  nuevaPublicacion: {
    titulo: string;
    descripcion: string;
    fecha: String;
    foto: string;
  } = { titulo: '', descripcion: '', fecha: new Date().toISOString(), foto: '' };

  constructor(private publicacionService: PublicacionService) {
    this.fecha = this.publicacionService.obtenerFechaActual();
  }

  agregarFoto() {
    // Código para capturar la foto usando el plugin de cámara
  }
  async onAgregarPublicacion(form: NgForm) {
    if (form.valid) {
      this.nuevaPublicacion = {
        titulo: form.value.titulo,
        descripcion: form.value.descripcion,
        fecha: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes(),
        foto: form.value.foto,
      };
      await this.publicar.emit(this.nuevaPublicacion);
      form.resetForm();
    }
  }
}
