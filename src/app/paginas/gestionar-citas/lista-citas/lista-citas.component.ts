import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, 
  IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { Citas } from 'src/app/modelo/citas';
import { CitasService } from 'src/app/servicio/citas.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonButton, IonIcon,  
    CommonModule, FormsModule]
})
export class ListaCitasComponent implements OnInit {
  @Input() citas:  Citas[] | null = null;
  @Output() borrarCita = new EventEmitter<number>();

  constructor(private citasService: CitasService) {
    addIcons({trash});
  }

  async ngOnInit() {
    await this.citasService.iniciarPlugin();
  }
  
  async onBorrarCita(id: number) {
    await this.borrarCita.emit(id);
  }
}
