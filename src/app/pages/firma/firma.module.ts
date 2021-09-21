import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirmaPageRoutingModule } from './firma-routing.module';

import { FirmaPage } from './firma.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FirmaPageRoutingModule
  ],
  providers:[],
  declarations: [FirmaPage]
})
export class FirmaPageModule {}
