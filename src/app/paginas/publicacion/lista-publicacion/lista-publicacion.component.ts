import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionService } from 'src/app/servicio/publicacion.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-lista-publicacion',
  templateUrl: './lista-publicacion.component.html',
  styleUrls: ['./lista-publicacion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ListaPublicacionComponent implements OnInit {
  @Input() publicaciones: Publicacion[] | null = null;
  @Output() borrarPublicacion = new EventEmitter<number>();

  constructor(
    private publicacionService: PublicacionService,
    private modalController: ModalController
  ) {
    addIcons({ trash });
  }

  async ngOnInit() {
    await this.publicacionService.iniciarPlugin();
  }

  async onBorrarPublicacion(id: number) {
    const modal = await this.modalController.create({
      component: ConfirmDeleteComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.borrarPublicacion.emit(id);
    }
  }
}
