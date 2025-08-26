import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage),
  // },
  // {
  //   path: 'contact',
  //   loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage),
  // },
  {
    path: '**', // cualquier otra ruta
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
