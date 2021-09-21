"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.InicioPage = void 0;
var core_1 = require("@angular/core");
var ver_doc_page_1 = require("src/app/components/ver-doc/ver-doc.page");
var operators_1 = require("rxjs/operators");
var js_sha256_1 = require("js-sha256");
var InicioPage = /** @class */ (function () {
    function InicioPage(barcodeScanner, _modal, router, _fireBase, _storage, alertController, _comp, route, _data, menu) {
        this.barcodeScanner = barcodeScanner;
        this._modal = _modal;
        this.router = router;
        this._fireBase = _fireBase;
        this._storage = _storage;
        this.alertController = alertController;
        this._comp = _comp;
        this.route = route;
        this._data = _data;
        this.menu = menu;
        this.firmados = [];
        this.segment = 'proceso';
        this.firmProceso = [];
        this.firmFirmado = [];
        this.firmCancelado = [];
        this.docStatus = 'En proceso...';
        this.firmados_aux = [];
    }
    InicioPage.prototype.openFirst = function () {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    };
    InicioPage.prototype.ngOnInit = function () {
        var _this = this;
        this._data.currentMessage.subscribe(function (message) {
            console.log('ESTE MENSAJE LLEGO', message);
            _this.getStatus(message);
        });
        if (!this._storage.appIniciado)
            this.getAll();
    };
    InicioPage.prototype.singBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signBox_Id;
            var _this = this;
            return __generator(this, function (_a) {
                console.log('********************************  INICIAR SIN BOX  ********************************');
                signBox_Id = js_sha256_1.sha256(this._storage.datos.EMAIL.toLowerCase().trim());
                this._fireBase.singBox(signBox_Id).stateChanges(['child_added']).pipe(operators_1.map(function (changes) {
                    var data = changes.payload.val();
                    var id = changes.payload.key;
                    return __assign({ id: id }, data);
                })).subscribe(function (child_added) { return __awaiter(_this, void 0, void 0, function () {
                    var valor, trans, cf, firmados_aux, rep;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                valor = child_added;
                                console.log('MOSTRAR VALOR', child_added);
                                if (!(valor.type == 'validate_email')) return [3 /*break*/, 2];
                                return [4 /*yield*/, this._storage.setLocalStorage('VALID_EMAIL', true)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!(valor.type == 'credit')) return [3 /*break*/, 5];
                                return [4 /*yield*/, this._storage.getLocalStorage('TRANSFERENCIAS')];
                            case 3:
                                trans = _a.sent();
                                return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                            case 4:
                                cf = _a.sent();
                                this._storage.setLocalStorage('CREDIFIRMAS', Number(cf) + Number(valor.value));
                                valor.from = 'RECIBIR';
                                trans.unshift(valor);
                                this._storage.setLocalStorage('TRANSFERENCIAS', trans);
                                this._comp.presentToast('Felicidades recibiste ' + Number(valor.value) + ' credifirmas', 'success', 2500);
                                /*  ELIMINAR DE SIGNBOX*/
                                this._fireBase.updateSignBox(signBox_Id, valor.id, { status: 'PROC' }).then(function (res) {
                                    console.log('MENSAJE PUESTO EN PROCESO ', valor.id);
                                }, function (err) {
                                    _this._comp.presentToast('Error con servidor', 'danger', 3000);
                                });
                                _a.label = 5;
                            case 5:
                                if (!(valor.type == 'sign')) return [3 /*break*/, 7];
                                return [4 /*yield*/, this._storage.getLocalStorage('FIRMAS')];
                            case 6:
                                firmados_aux = _a.sent();
                                rep = firmados_aux.findIndex(function (d1) { return d1.pathFireBase == valor.value; });
                                //lo leyo o porque ya se le envio el mensaje antes
                                if (rep == -1) { //No encontrado en listado
                                    this._fireBase.singFirma(valor.value).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, dataGuardar;
                                        var _this = this;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    res.fileimg = res.fileimg.replace(' ', '');
                                                    res.pathFireBase = valor.value;
                                                    res.keySingBox = valor.id;
                                                    if (!(res.fileimg.substring(0, 4).toLowerCase() != 'http')) return [3 /*break*/, 2];
                                                    _a = res;
                                                    return [4 /*yield*/, this._comp.resizeImage(res.fileimg.replace(' ', ''), 200, 168)];
                                                case 1:
                                                    _a.fileimg = _b.sent();
                                                    _b.label = 2;
                                                case 2:
                                                    dataGuardar = {
                                                        pathFireBase: res.pathFireBase,
                                                        filestatus: res.filestatus,
                                                        filestatuscode: res.filestatuscode,
                                                        filetitle: res.filetitle,
                                                        timestamp: res.timestamp,
                                                        fileimg: res.fileimg,
                                                        creatorname: res.creatorname,
                                                        lacchain_tx: res.lacchain_tx,
                                                        signature: res.signature,
                                                        keySingBox: res.keySingBox
                                                    };
                                                    this.firmados.unshift(dataGuardar);
                                                    this.listFirmas = this.firmados;
                                                    return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', this.listFirmas)];
                                                case 3:
                                                    _b.sent();
                                                    this.getStatus(res.pathFireBase);
                                                    /*  ELIMINAR DE SIGNBOX*/
                                                    this._fireBase.updateSignBox(signBox_Id, valor.id, { status: 'PROC' }).then(function (res) {
                                                        console.log('MENSAJE PUESTO EN PROCESO ', valor.id);
                                                    }, function (err) {
                                                        _this._comp.presentToast('Error con servidor', 'danger', 3000);
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); }, function (err) {
                    _this._comp.presentToast('Error con servidor', 'danger', 3000);
                });
                return [2 /*return*/];
            });
        });
    };
    InicioPage.prototype.presentAlertPrompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cf, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                    case 1:
                        cf = _a.sent();
                        if (Number(cf) <= 0) {
                            this._comp.presentToast('Ya no tiene crédifirmas disponibles', 'danger', 3000);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: 'Código de documento',
                                inputs: [
                                    {
                                        name: 'codigo',
                                        id: 'codigo',
                                        type: 'textarea',
                                        placeholder: 'Ingrese código de documento a firmar'
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: 'Ok',
                                        handler: function (res) {
                                            console.log('Confirm Ok', res);
                                            var doc = _this.firmados.find(function (d) { return d.pathFireBase == res.codigo; });
                                            console.log('Mostrar busqueda FIND', doc);
                                            if (doc)
                                                _this._comp.presentToast('Documento ya fue firmado', 'danger', 2000);
                                            else
                                                _this.router.navigate(['/app/firma/', res.codigo]);
                                        }
                                    }
                                ]
                            })];
                    case 2:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.cancelarFirmaConfirm = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var textHeader, textMessage, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textHeader = 'Cancelar firma!';
                        textMessage = 'Quiere <strong>cancelar</strong> su firma del documento?';
                        if (doc.keySingBox) {
                            textHeader = 'Cancelar documento!';
                            textMessage = 'Quiere <strong>cancelar</strong> documento a firmar?';
                        }
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: textHeader,
                                message: textMessage,
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
                                                this.cancelar(doc.pathFireBase);
                                                this._fireBase.cancelarFirma(doc.pathFireBase, this._storage.datos.DID).then(function (res) {
                                                });
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
    InicioPage.prototype.eliminarDocConfirm = function (pathFireBase) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Eliminar documento!',
                            message: 'Quiere <strong>eliminar</strong> documento de dispositivo?',
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
                                            this["delete"](pathFireBase);
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
    InicioPage.prototype.getStatus = function (pathFireBase) {
        var _this = this;
        this._fireBase.getDocStatus(pathFireBase).valueChanges()
            .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 3];
                        index = this.firmados.findIndex(function (d) { return d.pathFireBase == pathFireBase; });
                        if (index != -1) {
                            this.firmados[index].filestatus = data.filestatus;
                            this.firmados[index].filestatuscode = data.filestatuscode;
                        }
                        this.listFirmas.firmados = this.firmados;
                        if (!(data.filestatuscode != 'PROC')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', this.listFirmas)];
                    case 1:
                        _a.sent();
                        this.refresh();
                        return [3 /*break*/, 3];
                    case 2:
                        this.refresh();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }, function (err) {
            _this._comp.presentToast('Error con servidor', 'danger', 3000);
        });
    };
    InicioPage.prototype.refresh = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, repetido, i, rep;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('FIRMAS')];
                    case 1:
                        _a.listFirmas = (_b.sent()) || [];
                        this.firmProceso = [];
                        this.firmFirmado = [];
                        this.firmCancelado = [];
                        this.firmados = this.listFirmas || [];
                        repetido = [];
                        if (this.firmados.length == 0 && event)
                            event.target.complete();
                        for (i = 0; i < this.firmados.length; i++) {
                            if (this.firmados[i].filestatuscode != 'CANC') {
                                rep = repetido.findIndex(function (p) { return p == _this.firmados[i].pathFireBase; });
                                if (i == (this.firmados.length - 1)) {
                                    if (event)
                                        event.target.complete();
                                }
                                if (rep != -1)
                                    continue;
                            }
                            if (this.firmados[i].filestatuscode == 'TERM')
                                this.firmFirmado.push(this.firmados[i]);
                            if (this.firmados[i].filestatuscode == 'PROC' || this.firmados[i].filestatuscode == 'INI')
                                this.firmProceso.push(this.firmados[i]);
                            if (this.firmados[i].filestatuscode == 'CANC')
                                this.firmCancelado.push(this.firmados[i]);
                            repetido.push(this.firmados[i].pathFireBase);
                            if (i == (this.firmados.length - 1)) {
                                if (event)
                                    event.target.complete();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.verDoc = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('VER DOC', data);
                        return [4 /*yield*/, this._modal.create({
                                component: ver_doc_page_1.VerDocPage,
                                componentProps: { data: data, cancel: false }
                            }).then(function (modal) { return modal.present(); })];
                    case 1:
                        modal = _a.sent();
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.verCancelado = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._modal.create({
                            component: ver_doc_page_1.VerDocPage,
                            componentProps: { data: data, cancel: true }
                        }).then(function (modal) { return modal.present(); })];
                    case 1:
                        modal = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.segmentChanged = function (e) {
        this.segment = e.detail.value;
    };
    InicioPage.prototype.ionViewDidEnter = function () {
        this.refresh();
    };
    InicioPage.prototype.getAll = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._storage.appIniciado = true;
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('FIRMAS')];
                    case 1:
                        _a.listFirmas = (_b.sent()) || [];
                        this.firmProceso = [];
                        this.firmFirmado = [];
                        this.firmCancelado = [];
                        this.firmados = this.listFirmas.firmados || [];
                        if (this.firmados.length == 0) {
                            this.singBox();
                            if (event)
                                event.target.complete();
                        }
                        for (i = 0; i < this.firmados.length; i++) {
                            if (this.firmados[i].filestatuscode != 'CANC') {
                                this.getStatus(this.firmados[i].pathFireBase);
                            }
                            else {
                                if (this.firmados[i].filestatuscode == 'TERM')
                                    this.firmFirmado.push(this.firmados[i]);
                                if (this.firmados[i].filestatuscode == 'PROC' || this.firmados[i].filestatuscode == 'INI')
                                    this.firmProceso.push(this.firmados[i]);
                                if (this.firmados[i].filestatuscode == 'CANC')
                                    this.firmCancelado.push(this.firmados[i]);
                            }
                            if (i == (this.firmados.length - 1)) {
                                if (event)
                                    event.target.complete();
                                else {
                                    this.singBox();
                                    event.target.complete();
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype["delete"] = function (pathFirebase) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = this.firmados.findIndex(function (d) { return d.pathFireBase == pathFirebase; });
                        if (!(doc == -1)) return [3 /*break*/, 1];
                        this.refresh();
                        this._comp.presentToast('Error al eliminar documento', 'danger', 2000);
                        return [3 /*break*/, 3];
                    case 1:
                        this.firmados.splice(doc, 1);
                        this.listFirmas.firmados = this.firmados;
                        return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', this.listFirmas)];
                    case 2:
                        _a.sent();
                        this.refresh();
                        this._comp.presentToast('Documento se eliminó con éxito', 'success', 2500);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.cancelar = function (pathFirebase) {
        return __awaiter(this, void 0, void 0, function () {
            var text, doc, signBox_Id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = 'Firma cancelada de documento';
                        doc = this.firmados.findIndex(function (d) { return d.pathFireBase == pathFirebase; });
                        if (!(doc == -1)) return [3 /*break*/, 1];
                        this._comp.presentToast('Error al cancelar firma', 'danger', 2000);
                        return [3 /*break*/, 3];
                    case 1:
                        if (this.firmados[doc].keySingBox) {
                            signBox_Id = js_sha256_1.sha256(this._storage.datos.EMAIL.toLowerCase().trim());
                            this._fireBase.updateSignBox(signBox_Id, this.firmados[doc].keySingBox, { status: 'CANC' }).then(function (res) {
                            });
                            text = 'Documento a firmar cancelado';
                        }
                        this.firmados[doc].filestatuscode = 'CANC';
                        this.firmados[doc].filestatus = 'Cancelado';
                        this.firmados[doc].pathCancelado = this.firmados[doc].pathFireBase;
                        this.firmados[doc].pathFireBase = 'CANCELADO';
                        this.listFirmas.firmados = this.firmados;
                        return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', this.listFirmas)];
                    case 2:
                        _a.sent();
                        this.refresh();
                        this._comp.presentToast(text, 'success', 2500);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.scan = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cf;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                    case 1:
                        cf = _a.sent();
                        if (Number(cf) <= 0) {
                            this._comp.presentToast('Ya no tiene crédifirmas disponibles', 'danger', 3000);
                            return [2 /*return*/];
                        }
                        this.barcodeScanner.scan({ prompt: "Lee el código para firmar documento" }).then(function (barcodeData) { return __awaiter(_this, void 0, void 0, function () {
                            var doc;
                            return __generator(this, function (_a) {
                                if (!barcodeData.cancelled) {
                                    barcodeData.text = barcodeData.text.replace('https://appcuerdo.com/www/?code=', '');
                                    barcodeData.text = barcodeData.text.replace('http://appcuerdo.com/www/?code=', '');
                                    doc = this.firmados.find(function (d) { return d.pathFireBase == barcodeData.text; });
                                    if (doc)
                                        this._comp.presentToast('Documento ya esta en su aplicativo', 'warning', 2000);
                                    else
                                        this.router.navigate(['/app/firma/', barcodeData.text]);
                                }
                                return [2 /*return*/];
                            });
                        }); })["catch"](function (err) {
                            console.log('Error', err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.docSingBox = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var cf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                    case 1:
                        cf = _a.sent();
                        if (Number(cf) <= 0)
                            this._comp.presentToast('Ya no tiene crédifirmas disponibles', 'danger', 3000);
                        else
                            this.router.navigate(['/app/firma/', path]);
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.perfil = function () {
        this.router.navigate(['/app/tab3']);
    };
    InicioPage.prototype.prueba = function () {
        this.router.navigate(['/app/firma/', 'jkDEt7rNfKUZTuhWWCt6u8QX9d42/12d3fa10-418c-4300-935e-1dd99f93f1eb']);
    };
    InicioPage = __decorate([
        core_1.Component({
            selector: 'app-inicio',
            templateUrl: './inicio.page.html',
            styleUrls: ['./inicio.page.scss']
        })
    ], InicioPage);
    return InicioPage;
}());
exports.InicioPage = InicioPage;
