import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ConfirmDeleteComponent {
  constructor(private modalController: ModalController) {}

  confirmarEliminacion() {
    this.modalController.dismiss(true);
  }

  cancelar() {
    this.modalController.dismiss(false);
  }
}
