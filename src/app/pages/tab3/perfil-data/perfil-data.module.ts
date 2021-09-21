import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilDataPageRoutingModule } from './perfil-data-routing.module';

import { PerfilDataPage } from './perfil-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilDataPageRoutingModule
  ],
  declarations: [PerfilDataPage]
})
export class PerfilDataPageModule {}
