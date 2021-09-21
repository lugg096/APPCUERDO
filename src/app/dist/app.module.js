"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.firebaseConfig = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
/* AngularFire */
var database_1 = require("@angular/fire/database");
var auth_1 = require("@angular/fire/auth");
var fire_1 = require("@angular/fire");
/* HttpClient*/
var http_1 = require("@angular/common/http");
/* Angular Generate Code QR*/
var angularx_qrcode_1 = require("angularx-qrcode");
/* Componentes Ionic */
var ngx_1 = require("@ionic-native/clipboard/ngx");
var ngx_2 = require("@ionic-native/barcode-scanner/ngx");
var ngx_3 = require("@ionic-native/social-sharing/ngx");
var data_service_service_1 = require("./services/data-service.service");
var ver_doc_page_1 = require("./components/ver-doc/ver-doc.page");
var generar_code_qr_component_1 = require("./components/generar-code-qr/generar-code-qr.component");
var ver_foto_component_1 = require("./components/ver-foto/ver-foto.component");
var contry_component_1 = require("./components/contry/contry.component");
var port_service_1 = require("./services/port.service");
var pipes_module_1 = require("./pipes/pipes.module");
var ngx_4 = require("@ionic-native/http/ngx");
exports.firebaseConfig = {
    apiKey: "AIzaSyD2dLlwKU3AXM9eqheF-jiWGg55ZVotKWc",
    authDomain: "stampingland-80f02.firebaseapp.com",
    databaseURL: "https://stampingland-80f02.firebaseio.com",
    projectId: "stampingland-80f02",
    storageBucket: "stampingland-80f02.appspot.com",
    messagingSenderId: "955246782443",
    appId: "1:955246782443:web:f11ca74294acf2e10cdbae"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                ver_doc_page_1.VerDocPage,
                generar_code_qr_component_1.GenerarCodeQRComponent,
                ver_foto_component_1.VerFotoComponent,
                contry_component_1.ContryComponent
            ],
            entryComponents: [
                ver_doc_page_1.VerDocPage,
                generar_code_qr_component_1.GenerarCodeQRComponent,
                ver_foto_component_1.VerFotoComponent,
                contry_component_1.ContryComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                angular_1.IonicModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                fire_1.AngularFireModule.initializeApp(exports.firebaseConfig),
                database_1.AngularFireDatabaseModule,
                auth_1.AngularFireAuthModule,
                angularx_qrcode_1.QRCodeModule,
                pipes_module_1.PipesModule
            ],
            providers: [
                ngx_2.BarcodeScanner,
                ngx_3.SocialSharing,
                ngx_1.Clipboard,
                data_service_service_1.DataService,
                port_service_1.PortService,
                ngx_4.HTTP,
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
