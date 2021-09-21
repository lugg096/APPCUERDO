import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciaPageRoutingModule } from './transferencia-routing.module';

import { TransferenciaPage } from './transferencia.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciaPageRoutingModule,
    RouterModule.forChild([{ path: '', component: TransferenciaPage }]),

  ],
  declarations: [TransferenciaPage]
})
export class TransferenciaPageModule {}
