"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./guards/auth.guard");
var noLogin_guard_1 = require("./guards/noLogin.guard");
var routes = [
    {
        path: 'home',
        canActivate: [noLogin_guard_1.noLoginGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); }
    },
    {
        path: 'app',
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: 'inicio',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/inicio/inicio.module'); }).then(function (m) { return m.InicioPageModule; }); }
            },
            {
                path: 'firma/:valor',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/firma/firma.module'); }).then(function (m) { return m.FirmaPageModule; }); }
            },
            {
                path: 'transfer',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/transferencia/transferencia.module'); }).then(function (m) { return m.TransferenciaPageModule; }); }
            },
            {
                path: 'perfil',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/tab3/tab3.module'); }).then(function (m) { return m.Tab3PageModule; }); }
            },
            {
                path: 'perfil-biocard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/perfil-biocard/perfil-biocard.module'); }).then(function (m) { return m.PerfilBiocardPageModule; }); }
            },
        ]
    },
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/inicio/inicio.module'); }).then(function (m) { return m.InicioPageModule; }); },
        pathMatch: 'full'
    },
    {
        path: '**',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/not-found/not-found.module'); }).then(function (m) { return m.NotFoundPageModule; }); }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
