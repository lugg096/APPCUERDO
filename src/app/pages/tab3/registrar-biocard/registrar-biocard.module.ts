import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarBiocardPageRoutingModule } from './registrar-biocard-routing.module';

import { RegistrarBiocardPage } from './registrar-biocard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarBiocardPageRoutingModule
  ],
  declarations: [RegistrarBiocardPage]
})
export class RegistrarBiocardPageModule {}
