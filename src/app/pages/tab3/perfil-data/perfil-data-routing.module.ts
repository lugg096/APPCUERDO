import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilDataPage } from './perfil-data.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilDataPageRoutingModule {}
