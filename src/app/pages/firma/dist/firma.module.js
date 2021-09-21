"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirmaPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var firma_routing_module_1 = require("./firma-routing.module");
var firma_page_1 = require("./firma.page");
var components_module_1 = require("src/app/components/components.module");
var FirmaPageModule = /** @class */ (function () {
    function FirmaPageModule() {
    }
    FirmaPageModule = __decorate([
        core_1.NgModule({
            imports: [
                components_module_1.ComponentsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                firma_routing_module_1.FirmaPageRoutingModule
            ],
            providers: [],
            declarations: [firma_page_1.FirmaPage]
        })
    ], FirmaPageModule);
    return FirmaPageModule;
}());
exports.FirmaPageModule = FirmaPageModule;
