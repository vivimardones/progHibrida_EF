import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import { FormularioCitaComponent } from './formulario-cita/formulario-cita.component';
import { IonHeader, IonToolbar, IonTitle, IonButtons, 
  IonContent, IonBackButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CitasService } from 'src/app/servicio/citas.service';
import { Citas } from 'src/app/modelo/citas';

@Component({
  selector: 'app-gestionar-citas',
  templateUrl: './gestionar-citas.page.html',
  styleUrls: ['./gestionar-citas.page.scss'],
  standalone: true,
  imports: [ RouterModule, IonButtons, IonBackButton, 
    IonContent, IonHeader,  IonTitle, IonToolbar, CommonModule, 
    FormsModule, FormularioCitaComponent, ListaCitasComponent],
})

export class GestionarCitasPage implements OnInit {
  citas: Citas[] = [];
  constructor(private citasService: CitasService) {
  }

  async ngOnInit() { 
    await this.citasService.iniciarPlugin();
    await this._actualizar()
  }
  async _actualizar() {
    this.citas = await this.citasService.getCitas();
  }
  async agregarCita($event: Citas) { 
    const cita:Citas = {
      frase: $event.frase,
      autor: $event.autor,
    };
    await this.citasService.addCitas(cita); 
    await this._actualizar();
  } 
  
  async borrarCita(index: number) { 
    await this.citasService.deleteCitas(index); 
    await this._actualizar();
  }

}
