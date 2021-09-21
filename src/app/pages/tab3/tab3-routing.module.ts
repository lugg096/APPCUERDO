import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'perfil-data',
    loadChildren: () => import('../tab3/perfil-data/perfil-data.module').then( m => m.PerfilDataPageModule)
  },

  {
    path: 'registrar-biocard/:valor',
    loadChildren: () => import('./registrar-biocard/registrar-biocard.module').then( m => m.RegistrarBiocardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
