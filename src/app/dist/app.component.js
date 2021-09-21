"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var StatusBar = core_2.Plugins.StatusBar;
var AppComponent = /** @class */ (function () {
    function AppComponent(router, alertController, _storage, _apiAppcuedo, _comp) {
        this.router = router;
        this.alertController = alertController;
        this._storage = _storage;
        this._apiAppcuedo = _apiAppcuedo;
        this._comp = _comp;
        this.credifirmas = 0;
        this.validEmail = false;
        this.urlPolPriv = '';
        this.urlTerCon = '';
        this.comprar = '';
        StatusBar.setStyle({ style: core_2.StatusBarStyle.Dark });
        StatusBar.setBackgroundColor({ color: "#044483" });
        this.initApp();
    }
    AppComponent.prototype.initApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._storage;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 1:
                        _a.datos = (_b.sent()) || this._storage.datos;
                        this.comprar = 'https://appcuerdo.com/sales/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
                        this.urlPolPriv = 'https://appcuerdo.com/agreementConds/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
                        this.urlTerCon = 'https://appcuerdo.com/agreementPriv/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.willOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                    case 1:
                        _a.credifirmas = (_c.sent()) || 0;
                        _b = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('VALID_EMAIL')];
                    case 2:
                        _b.validEmail = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.validar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'alert-validar',
                            message: ' <div class="text-center"><img class="imgIcon"   src="../assets/images/msjsignBox.png">' +
                                ' </div> <p class="text-wrap text-center mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">Se envio solicitud a ' + this._storage.datos.EMAIL + '</b> <br>' +
                                ' <small style="color: darkgrey;">Valide su email para hacer transacciones y poder recibir documentos a firmar.</small> <br>  <br>' +
                                '<small class="colorPregunta">¿No le llego ningún mensaje?</small> <br> <small style="color: darkgrey;">Intente enviar nuevamente</small></p>',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Enviar nuevamente',
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            this._apiAppcuedo.sendValidationEmail({
                                                email: this._storage.datos.EMAIL,
                                                dni: this._storage.datos.DNI,
                                                did: this._storage.datos.DID
                                            }).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            console.log('comprobarCode', res);
                                                            this._comp.presentToast('Se envio solicitud con exito', 'success', 3000);
                                                            return [4 /*yield*/, alert.dismiss()];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.closeMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.menu.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('menu', { static: false })
    ], AppComponent.prototype, "menu");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
