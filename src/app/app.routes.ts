import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
