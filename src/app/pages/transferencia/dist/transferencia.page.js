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
exports.TransferenciaPage = void 0;
var core_1 = require("@angular/core");
var js_sha256_1 = require("js-sha256");
var firebase = require("firebase");
var TransferenciaPage = /** @class */ (function () {
    function TransferenciaPage(clipboard, _fireBase, router, _storage, loadingController, _comp, alertController) {
        this.clipboard = clipboard;
        this._fireBase = _fireBase;
        this.router = router;
        this._storage = _storage;
        this.loadingController = loadingController;
        this._comp = _comp;
        this.alertController = alertController;
        this.slideOptsOnboarding = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        this.comprar = '';
        this.email = '';
        this.cred = '0.0';
        this.credifirmas = '';
        this.transferencias = [];
        this.data = {
            PHOTO: ''
        };
    }
    TransferenciaPage.prototype.ngOnInit = function () {
    };
    TransferenciaPage.prototype.ionViewDidEnter = function () {
        this.email = '';
        this.cred = '';
        this.getData();
    };
    TransferenciaPage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    TransferenciaPage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    TransferenciaPage.prototype.recibir = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'alert-validar',
                            message: ' <div class="text-center">' +
                                ' </div> <p class="text-wrap text-center mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">Recibir credifirmas </b> <br>' +
                                ' <small style="color: darkgrey;">Comparte email con otros usuarios para recibir transferencias. <br><b>' + this._storage.datos.EMAIL + '</b></small> ',
                            buttons: [
                                {
                                    text: 'Copiar email',
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.clipboard.copy(this._storage.datos.EMAIL);
                                            this._comp.presentToast('Copiado', 'primary', 1000);
                                            return [2 /*return*/];
                                        });
                                    }); }
                                },
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
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
    TransferenciaPage.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('TRANSFERENCIAS')];
                    case 1:
                        _a.transferencias = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                    case 2:
                        _b.credifirmas = _c.sent();
                        this.comprar = 'https://appcuerdo.com/sales/?i=' + this._storage.datos.SINBOX_ID + '&e=' + this._storage.datos.EMAIL_B64 + '&n=' + this._storage.datos.NAME_B64 + '&d=' + this._storage.datos.DNI_B64;
                        return [2 /*return*/];
                }
            });
        });
    };
    TransferenciaPage.prototype.goInicio = function () {
        this.router.navigate(['/app/inicio']);
    };
    TransferenciaPage.prototype.campoInvalidos = function () {
        var re = /[^@]+@[^@]+\.[^@]+$/;
        if (this.cred == '' || this.email.trim() == '' || !re.test(this.email))
            return true;
        return false;
    };
    TransferenciaPage.prototype.validar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.email == this._storage.datos.EMAIL) {
                            this._comp.presentToast('No puedo usar su propio email', 'danger', 3000);
                            return [2 /*return*/];
                        }
                        if (Number(this.cred) < 1) {
                            this._comp.presentToast('Cantidad a transferir inválida', 'danger', 3000);
                            return [2 /*return*/];
                        }
                        if (this.cred > this.credifirmas) {
                            this._comp.presentToast('No tiene cantidad de credefirmas a transferir', 'danger', 3000);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: 'Confirmar',
                                message: 'Transferir ' + this.cred + ' credifirmas al usuario de email <b>' + this.email + '</b>',
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'Aceptar',
                                        handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                this.enviar();
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
    TransferenciaPage.prototype.enviar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signBox_Id, data, loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signBox_Id = js_sha256_1.sha256(this.email.toLowerCase().trim());
                        data = {
                            did: this._storage.datos.DID,
                            status: "INI",
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                            transaction: "Tranfderencia",
                            type: "credit",
                            value: this.cred + ''
                        };
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Por favor espere...',
                                backdropDismiss: false,
                                showBackdrop: true,
                                spinner: "bubbles"
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this._fireBase.insertSignBox(signBox_Id, data).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var cf, enviado, trans;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                                    case 1:
                                        cf = _a.sent();
                                        this._storage.setLocalStorage('CREDIFIRMAS', Number(cf) - Number(this.cred));
                                        enviado = {
                                            did: this.email,
                                            from: "ENVIADO",
                                            timestamp: new Date(),
                                            value: this.cred
                                        };
                                        return [4 /*yield*/, this._storage.getLocalStorage('TRANSFERENCIAS')];
                                    case 2:
                                        trans = _a.sent();
                                        trans.unshift(enviado);
                                        this._storage.setLocalStorage('TRANSFERENCIAS', trans);
                                        this.getData();
                                        loading.dismiss();
                                        this.backSlidePadre();
                                        this._comp.presentToast('Tranferencia con éxito', 'success', 3000);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            _this.getData();
                            loading.dismiss();
                            _this.backSlidePadre();
                            _this._comp.presentToast('Error en tranferencia', 'danger', 2000);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], TransferenciaPage.prototype, "slidesPadre");
    TransferenciaPage = __decorate([
        core_1.Component({
            selector: 'app-transferencia',
            templateUrl: './transferencia.page.html',
            styleUrls: ['./transferencia.page.scss']
        })
    ], TransferenciaPage);
    return TransferenciaPage;
}());
exports.TransferenciaPage = TransferenciaPage;
