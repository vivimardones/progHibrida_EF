import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ingresos',
    loadComponent: () => import('./paginas/ingresos/ingresos.page').then((m) => m.IngresosPage),
  },
  {
    path: '',
    redirectTo: 'ingresos',
    pathMatch: 'full',
  },
  {
    path: 'publicacion',
    loadComponent: () => import('./paginas/publicacion/publicacion.page').then( m => m.PublicacionPage)
  },

];
