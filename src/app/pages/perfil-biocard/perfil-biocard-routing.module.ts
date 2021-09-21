import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilBiocardPage } from './perfil-biocard.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilBiocardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilBiocardPageRoutingModule {}
