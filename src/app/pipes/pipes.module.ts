import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FiltroCountryPipe } from './filtro-country.pipe';

@NgModule({
  declarations: [FiltroCountryPipe],
  exports: [FiltroCountryPipe],
  imports: [
    IonicModule
  ]
})
export class PipesModule { }
