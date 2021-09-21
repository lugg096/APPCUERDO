import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PinComponent } from './pin/pin.component';
import { SignatureImageComponent } from './signature-image/signature-image.component';



@NgModule({
  declarations: [
    SignatureImageComponent,
    PinComponent
  ],
  exports:[
    SignatureImageComponent,
    PinComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
