import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarBiocardPage } from './registrar-biocard.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarBiocardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarBiocardPageRoutingModule {}
