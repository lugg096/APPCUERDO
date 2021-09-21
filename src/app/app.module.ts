import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* AngularFire */
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

/* HttpClient*/
import { HttpClientModule } from '@angular/common/http'

/* Angular Generate Code QR*/
import { QRCodeModule } from 'angularx-qrcode';

/* Componentes Ionic */
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataService } from './services/data-service.service';
import { VerDocPage } from './components/ver-doc/ver-doc.page';
import { GenerarCodeQRComponent } from './components/generar-code-qr/generar-code-qr.component';
import { VerFotoComponent } from './components/ver-foto/ver-foto.component';
import { ContryComponent } from './components/contry/contry.component';
import { PortService } from './services/port.service';
import { FiltroCountryPipe } from './pipes/filtro-country.pipe';
import { PipesModule } from './pipes/pipes.module';

import { HTTP } from '@ionic-native/http/ngx'


export const firebaseConfig = {
  apiKey: "AIzaSyD2dLlwKU3AXM9eqheF-jiWGg55ZVotKWc",
  authDomain: "stampingland-80f02.firebaseapp.com",
  databaseURL: "https://stampingland-80f02.firebaseio.com",
  projectId: "stampingland-80f02",
  storageBucket: "stampingland-80f02.appspot.com",
  messagingSenderId: "955246782443",
  appId: "1:955246782443:web:f11ca74294acf2e10cdbae"
};

@NgModule({
  declarations: [
    AppComponent,
    VerDocPage,
    GenerarCodeQRComponent,
    VerFotoComponent,
    ContryComponent
  ],
  entryComponents: [
    VerDocPage,
    GenerarCodeQRComponent,
    VerFotoComponent,
    ContryComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    QRCodeModule,
    PipesModule
  ],
  providers: [
    BarcodeScanner,
    SocialSharing,
    Clipboard,
    DataService,
    PortService,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
