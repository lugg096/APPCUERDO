import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { noLoginGuard } from './guards/noLogin.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [noLoginGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'firma/:valor',
        loadChildren: () => import('./pages/firma/firma.module').then(m => m.FirmaPageModule)
      },
      {
        path: 'transfer',
        loadChildren: () => import('./pages/transferencia/transferencia.module').then( m => m.TransferenciaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'perfil-biocard',
        loadChildren: () => import('./pages/perfil-biocard/perfil-biocard.module').then( m => m.PerfilBiocardPageModule)
      },
    ]

  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    pathMatch: 'full'
  },

  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: 'prueba',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
