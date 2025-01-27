import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./paginas/publicacion/publicacion.page').then( m => m.PublicacionPage)
  },
  {
    path: '',
    redirectTo: 'cita-aleatoria',
    pathMatch: 'full',
  },
  {
    path: 'gestionar-citas',
    loadComponent: () => import('./paginas/gestionar-citas/gestionar-citas.page').then( m => m.GestionarCitasPage)
  },
  {
    path: 'ingresos',
    loadComponent: () => import('./paginas/ingresos/ingresos.page').then( m => m.IngresosPage)
  },
  {
    path: 'publicacion',
    loadComponent: () => import('./paginas/publicacion/publicacion.page').then( m => m.PublicacionPage)
  }
];
