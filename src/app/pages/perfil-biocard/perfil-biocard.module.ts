import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilBiocardPageRoutingModule } from './perfil-biocard-routing.module';

import { PerfilBiocardPage } from './perfil-biocard.page';
/* import { NgxQRCodeModule } from 'ngx-qrcode2'; */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilBiocardPageRoutingModule,
    /* NgxQRCodeModule */
  ],
  declarations: [PerfilBiocardPage]
})
export class PerfilBiocardPageModule {}
