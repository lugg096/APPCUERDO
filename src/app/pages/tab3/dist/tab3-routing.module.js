"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab3PageRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tab3_page_1 = require("./tab3.page");
var routes = [
    {
        path: '',
        component: tab3_page_1.Tab3Page
    },
    {
        path: 'perfil-data',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../tab3/perfil-data/perfil-data.module'); }).then(function (m) { return m.PerfilDataPageModule; }); }
    },
    {
        path: 'registrar-biocard/:valor',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./registrar-biocard/registrar-biocard.module'); }).then(function (m) { return m.RegistrarBiocardPageModule; }); }
    }
];
var Tab3PageRoutingModule = /** @class */ (function () {
    function Tab3PageRoutingModule() {
    }
    Tab3PageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], Tab3PageRoutingModule);
    return Tab3PageRoutingModule;
}());
exports.Tab3PageRoutingModule = Tab3PageRoutingModule;
