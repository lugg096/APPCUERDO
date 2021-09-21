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
exports.FirmaPage = void 0;
var core_1 = require("@angular/core");
var js_sha256_1 = require("js-sha256");
var sha1 = require("js-sha1");
var firebase = require("firebase");
var FirmaPage = /** @class */ (function () {
    function FirmaPage(barcodeScanner, router, _comp, _onboarding, _storage, _modal, _fireBase, route, loadingController, _data, alertController) {
        this.barcodeScanner = barcodeScanner;
        this.router = router;
        this._comp = _comp;
        this._onboarding = _onboarding;
        this._storage = _storage;
        this._modal = _modal;
        this._fireBase = _fireBase;
        this.route = route;
        this.loadingController = loadingController;
        this._data = _data;
        this.alertController = alertController;
        this.change = new core_1.EventEmitter();
        /* Variables PIN */
        this.pin = '';
        this.codigo = '';
        this.imgSiganture = '';
        this.barcodeData = '';
        this.servidorCard = null;
        this.load = true;
        /* Variables tipo de firma */
        this.solicitarPk = false;
        this.pinKey = false;
        this.signKey = false;
        this.formInvalid = true;
        this.vote = {};
        this.optionsVote = [];
        this.camposFormulario = [];
        this.datosEnStorage = [];
        this.dataFireBase = {
            datarequest: '',
            creatoricon: '',
            filestatus: '',
            filestatuscode: '',
            filetitle: '',
            creatorname: '',
            fileimg: ''
        };
        this.dataReqFirma = {
            operacion: 'sendTransaction',
            message: '',
            publicKeyTo: '',
            privateKey: ''
        };
        this.slideOptsOnboarding = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        this.camposRequeridos = [];
        this.path = '';
        this.isDocSingbox = false;
        /* *******************  FUNCIONES CODIGO PIN  ************************/
        this.dataSlideValid = {
            titulo: "",
            subTitulo: "Ingresar ePIN",
            texto: "Ingrese ePIN de 6 dígitos de appCuerdo"
        };
        this.loading = null;
    }
    FirmaPage.prototype.ngOnInit = function () {
    };
    FirmaPage.prototype.inValidString = function (data) {
        if (data.trim() == '')
            return true;
        else
            return false;
    };
    FirmaPage.prototype.fin = function () {
        this.router.navigate(['/app/inicio']);
    };
    FirmaPage.prototype.updateDataLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('CREDIFIRMAS')];
                    case 1:
                        cf = _a.sent();
                        this._storage.setLocalStorage('CREDIFIRMAS', Number(cf) - 1);
                        this._data.changeMessage(this.dataFireBase.pathFireBase);
                        return [2 /*return*/];
                }
            });
        });
    };
    FirmaPage.prototype.closeModal = function () {
        this._modal.dismiss({ dataPersonal: null });
    };
    FirmaPage.prototype.inputformInvalid = function () {
        var valid = 0;
        for (var i = 0; i < this.camposFormulario.length; i++) {
            if (this.camposFormulario[i].valor == '' || this.camposFormulario[i].valor.trim() == '') {
                console.log(this.camposFormulario[i].valor);
                valid++;
            }
            if (this.camposFormulario.length - 1 == i) {
                if (valid == 0)
                    this.formInvalid = false;
                else
                    this.formInvalid = true;
            }
        }
    };
    FirmaPage.prototype.scanBIOCard = function () {
        var _this = this;
        this.barcodeScanner.scan({ prompt: "Por favor, lea el código QR de su BIO-CARD." }).then(function (pathFB) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!pathFB.cancelled) {
                    this._fireBase.geBIOCard(pathFB.text).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var did;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!res) {
                                        this._comp.presentToast('Código inválido', 'danger', 2000);
                                        this.router.navigate(['/app/inicio']);
                                    }
                                    return [4 /*yield*/, this._storage.getLocalStorage('DID')];
                                case 1:
                                    did = _a.sent();
                                    if (res.status == 'ACTIVE' && did == res.DID) {
                                        this.nextSlidePadre();
                                    }
                                    else {
                                        this.router.navigate(['/app/inicio']);
                                        if (res.status != 'ACTIVE')
                                            this._comp.presentToast('BIOCard inactivo', 'danger', 2000);
                                        if (did != res.DID)
                                            this._comp.presentToast('BIOCard no registrada en su aplicativo', 'danger', 2000);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, function (err) {
                        _this._comp.presentToast('Código inválido', 'danger', 2000);
                        _this.router.navigate(['/app/inicio']);
                    });
                }
                return [2 /*return*/];
            });
        }); })["catch"](function (err) {
            _this._comp.presentToast('Error en lectura QR', 'danger', 2000);
            _this.router.navigate(['/app/inicio']);
        });
    };
    FirmaPage.prototype.validarCode = function () {
        if (js_sha256_1.sha256(this.codigo.toString()) == this.dataFireBase.hashcode)
            this.nextSlidePadre();
        else
            this._comp.presentToast('Código de seguridad inválido', 'danger', 2000);
    };
    FirmaPage.prototype.confirmarVoto = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var textHeader, textMessage, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textHeader = 'Confirmar voto!';
                        textMessage = 'Quiere confirmar su voto a <strong>' + data.opcion + '</strong>?';
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
                                        }
                                    }, {
                                        text: 'Aceptar',
                                        handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                this.vote = data;
                                                this.nextSlidePadre();
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
    FirmaPage.prototype.getDataFirma = function () {
        var _this = this;
        this.load = true;
        console.log(this.barcodeData);
        this._fireBase.singFirma(this.barcodeData).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataFireBase = res;
                        console.log(res);
                        if (!res) {
                            this._comp.presentToast('Código inválido', 'danger', 2000);
                            this.router.navigate(['/app/inicio']);
                            return [2 /*return*/];
                        }
                        if (res.filestatuscode != 'PROC') {
                            this._comp.presentToast('Documento inactivo', 'danger', 2000);
                            this.router.navigate(['/app/inicio']);
                            return [2 /*return*/];
                        }
                        /* OPCION DE VOTOS */
                        if (this.dataFireBase.modesign == "VOTES")
                            this.optionsVote = JSON.parse(this.dataFireBase.votes).votes;
                        this.dataFireBase.fileimg = this.dataFireBase.fileimg.replace(' ', ''); //Correccion de espacion 
                        this.dataFireBase.pathFireBase = this.barcodeData;
                        this.dataReqFirma.publicKeyTo = res.publicKeyTo;
                        return [4 /*yield*/, this.configCampos(res.datarequest)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.configPermisos(res.type)];
                    case 2:
                        _a.sent();
                        this.load = false;
                        return [2 /*return*/];
                }
            });
        }); }, function (err) {
            _this.load = false;
            _this._comp.presentToast('Error en servidor', 'danger', 2000);
            _this.router.navigate(['/app/inicio']);
        });
    };
    FirmaPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 1:
                        _a.data = _b.sent();
                        this.camposFormulario = [];
                        this.backSlidePadre();
                        this.barcodeData = this.route.snapshot.params.valor;
                        console.log('LLEVO PARAMETRO', this.barcodeData);
                        if (this.barcodeData.substring(0, 7) == 'SINGBOX') { /* Para saber si esta en singBox */
                            this.isDocSingbox = true;
                            this.barcodeData = this.barcodeData.substring(7, this.barcodeData.length);
                        }
                        this.getDataFirma();
                        return [2 /*return*/];
                }
            });
        });
    };
    FirmaPage.prototype.configCampos = function (dataReq) {
        var _this = this;
        /* ERROR -> FUNCION EN DESUSO  */
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var campos, i, campo, dtStorage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dataReq == '')
                            resolve(true);
                        campos = dataReq.split("|");
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < (campos.length - 1))) return [3 /*break*/, 4];
                        campo = campos[i].split(":");
                        return [4 /*yield*/, this._storage.getLocalStorage(campo[0])];
                    case 2:
                        dtStorage = _a.sent();
                        if (dtStorage) {
                            this.datosEnStorage.push(campo[0]);
                        }
                        else {
                            this.camposFormulario.push({
                                nombre: campo[0],
                                descripcion: campo[1] || '',
                                type: campo[2] || 'text',
                                valor: ''
                            });
                        }
                        if (i == campos.length - 2)
                            resolve(true);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    FirmaPage.prototype.configPermisos = function (docType) {
        var _this = this;
        return new Promise(function (resolve) {
            var permisos = docType.split("|");
            permisos.forEach(function (p, index) {
                if (p.length > 9) {
                    if (p.substring(0, 10) == 'privateKey') {
                        _this.solicitarPk = true; //Escanear QR de BIOCard
                        _this.servidorBIOCard = p.substring(11, p.length);
                        _this.verificarCardStorage(p.substring(11, p.length));
                    }
                }
                if (p == 'pinKey')
                    _this.pinKey = true;
                if (p == 'signKey')
                    _this.signKey = true;
                if (index == permisos.length - 1)
                    resolve(true);
            });
        });
    };
    FirmaPage.prototype.verificarCardStorage = function (servidor) {
        return __awaiter(this, void 0, void 0, function () {
            var listBiocard, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('BIOCARDS')];
                    case 1:
                        listBiocard = (_a.sent()) || [];
                        doc = listBiocard.find(function (d) { return d.servidor == js_sha256_1.sha256(servidor); });
                        console.log('Mostrar busqueda FIND', doc);
                        if (doc)
                            this.servidorCard = doc;
                        else {
                            this._comp.presentToast('Necesita BIOCard requerido', 'danger', 2000);
                            this.router.navigate(['/app/inicio']);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FirmaPage.prototype.compartiDatosBack = function () {
        if (this.solicitarPk)
            this.backSlidePadre();
        else
            this.router.navigate(['/app/inicio']);
    };
    FirmaPage.prototype.signKeyBack = function () {
        if (this.dataFireBase.datarequest != '' || this.solicitarPk)
            this.backSlidePadre();
        else
            this.router.navigate(['/app/inicio']);
    };
    FirmaPage.prototype.codeBack = function () {
        if (this.dataFireBase.datarequest != '' || this.solicitarPk || this.signKey)
            this.backSlidePadre();
        else
            this.router.navigate(['/app/inicio']);
    };
    FirmaPage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false); //Bloquear movimiento a siguiente Slide
        this.slidesPadre.slideNext(); //Siguiente Slide
        this.slidesPadre.lockSwipeToNext(true);
    };
    FirmaPage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false); //Bloquear movimiento a siguiente Slide
        this.slidesPadre.slidePrev(); //Anterior Slide
        this.slidesPadre.lockSwipeToPrev(true);
        this.pin = "";
    };
    FirmaPage.prototype.compartirData = function () {
        this.nextSlidePadre();
    };
    FirmaPage.prototype.imageSignature = function ($event) {
        var _this = this;
        this.imgSiganture = $event;
        this._comp.resizeImage(this.imgSiganture).then(function (res) {
            _this.imgSiganture = res;
        });
        this.nextSlidePadre();
    };
    FirmaPage.prototype.getClave = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var hash_PINsha256, _a, position, n1, n2, dataSegure, number01, number02, privateKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('DATA', this.data);
                        this.pin = $event;
                        hash_PINsha256 = js_sha256_1.sha256(js_sha256_1.sha256(this.pin.toString()));
                        if (!(hash_PINsha256 == this.data.PIN)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Por favor espere...',
                                backdropDismiss: false,
                                showBackdrop: true,
                                spinner: "bubbles"
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        position = Number(this.pin.substr(0, 2));
                        if (position > 62)
                            position = position - 62;
                        if (position == 0)
                            position = 2;
                        n1 = Number(this.pin.substr(2, 2));
                        n2 = Number(this.pin.substr(4, 2));
                        dataSegure = this.data.privateKey.substr(62, this.data.privateKey.length);
                        number01 = Number(dataSegure.split("G")[0]) - n1;
                        number02 = Number(dataSegure.split("G")[1]) - n2;
                        privateKey = this.data.privateKey.substr(0, position)
                            + number01.toString(16) + number02.toString(16) + this.data.privateKey.substring(position, 62);
                        console.log('LLAVE PRIVADA', privateKey);
                        this.firmar(privateKey);
                        return [3 /*break*/, 4];
                    case 3:
                        this._comp.presentToast('ePin es incorrecto', 'danger', 1500);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirmaPage.prototype.firmar = function (privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.dataReqFirma.privateKey = privateKey;
                this.dataReqFirma.message = '{"hashfile":"' + this.dataFireBase.filehash + '", "filehashbin":"' + this.dataFireBase.filehashbin + '", "hashcode":"' + this.dataFireBase.hashcode + '" }';
                console.log('MOSTRAR MESSAGE', this.dataReqFirma);
                this._onboarding.sendTransaction(this.dataReqFirma).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var date;
                    return __generator(this, function (_a) {
                        console.log('RESPUESTA sendTransaction ', res);
                        if (this.dataFireBase.modesign == 'API_REST')
                            this.singApiRest();
                        this.dataFireBase.lacchain_tx = res.transactionHash;
                        this.dataFireBase.signature = res.rawTransaction;
                        this.dataFireBase.codigo = this.codigo;
                        this.dataFireBase.signKey = this.imgSiganture;
                        date = new Date();
                        this.dataFireBase.timestamp = date.getTime();
                        /* ENVIAR DATA A GUARDAR EN FIREBASE */
                        this.sendDataFireBase(res);
                        return [2 /*return*/];
                    });
                }); }, function (err) {
                    _this.loading.dismiss();
                    _this._comp.presentToast('Error en servidor', 'danger', 2000);
                    _this.router.navigate(['/app/inicio']);
                });
                return [2 /*return*/];
            });
        });
    };
    FirmaPage.prototype.sendDataFireBase = function (res) {
        var _this = this;
        var dataRequestSend = '';
        for (var i = 0; i < this.camposFormulario.length; i++) {
            dataRequestSend = dataRequestSend + this.camposFormulario[i].nombre + ':' + this.camposFormulario[i].valor + '|';
        }
        var data = {
            device: 'APP',
            did: sha1(js_sha256_1.sha256(this.data.ADDRESS)),
            name: this.data.NAME,
            dni: this.data.DNI,
            datarequest: dataRequestSend,
            signature: res.rawTransaction,
            lacchain_tx: res.transactionHash,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            photo: this.data.PHOTO_MIN.substring(22, this.data.PHOTO_MIN.length),
            signKey: this.imgSiganture,
            public_key: this.data.publicKey,
            value: this.servidorCard ? this.servidorCard.value : null,
            cardId: this.servidorCard ? js_sha256_1.sha256(this.servidorCard.hash) : null,
            proofCardId: this.servidorCard ? js_sha256_1.sha256(this.servidorCard.hash) : null
        };
        if (this.dataFireBase.modesign == 'VOTES') {
            data.opt_opcionID = this.vote.opcionID;
            data.opt_opcion = this.vote.opcion;
        }
        this._fireBase.confirmarFirma(this.barcodeData, data).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('respuesta FIREBASE ', res);
                /* GUARDAR FIRMA EN STORAGE */
                this.saveStorage();
                return [2 /*return*/];
            });
        }); });
    };
    FirmaPage.prototype.saveStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firmas, typeDoc, _a, dataGuardar, doc;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('FIRMAS')];
                    case 1:
                        firmas = (_b.sent()) || [];
                        typeDoc = this.dataFireBase.filename.substring(this.dataFireBase.filename.length - 4, this.dataFireBase.filename.length);
                        if (!(typeDoc.toLowerCase() == '.pdf')) return [3 /*break*/, 3];
                        _a = this.dataFireBase;
                        return [4 /*yield*/, this._comp.resizeImage(this.dataFireBase.fileimg, 200, 168)];
                    case 2:
                        _a.fileimg = _b.sent();
                        _b.label = 3;
                    case 3:
                        dataGuardar = {
                            pathFireBase: this.dataFireBase.pathFireBase,
                            filestatus: this.dataFireBase.filestatus,
                            filestatuscode: this.dataFireBase.filestatuscode,
                            filetitle: this.dataFireBase.filetitle,
                            timestamp: this.dataFireBase.timestamp,
                            fileimg: this.dataFireBase.fileimg,
                            creatorname: this.dataFireBase.creatorname,
                            lacchain_tx: this.dataFireBase.lacchain_tx,
                            signature: this.dataFireBase.signature
                        };
                        doc = firmas.findIndex(function (d1) { return d1.pathFireBase == _this.dataFireBase.pathFireBase; });
                        if (!(doc == -1)) return [3 /*break*/, 5];
                        console.log('MOSTRAR DATA ACTUIALIZADA', firmas);
                        firmas.unshift(dataGuardar);
                        return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', firmas)];
                    case 4:
                        _b.sent();
                        this.load = false;
                        this.updateDataLocal();
                        this.nextSlidePadre();
                        console.log('ES UN DOCUEWMNTO LEIDO con QR');
                        return [3 /*break*/, 7];
                    case 5:
                        console.log('ESTE DOCUEMNTO SE REMPLZARA', firmas[doc]);
                        console.log('NUEVO VALOR', this.dataFireBase);
                        firmas[doc] = dataGuardar;
                        console.log('NUEVO VALOR DELISTA', firmas);
                        return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', firmas)];
                    case 6:
                        _b.sent();
                        this.load = false;
                        this.updateDataLocal();
                        this.nextSlidePadre();
                        console.log('DATO SE ACTUALIZO POR QUE ERA DE SINGBOX');
                        _b.label = 7;
                    case 7:
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    FirmaPage.prototype.singApiRest = function () {
        var _this = this;
        var get1 = {
            aCode: this.dataFireBase.pathFireBase,
            aFileHashBase64: this.dataFireBase.filehashbin,
            hash: this.dataFireBase.filehash,
            sello: this.dataFireBase.watermark
        };
        this._onboarding.get1(get1).subscribe(function (res) {
            _this._fireBase.putDocumento(_this.dataFireBase.pathFireBase, { filestatus: "Firmado", filestatuscode: "TERM" }).then(function (res) {
                console.log('BIEN');
            }, function (err) {
                _this._comp.presentToast('Problemas con firma ApiRest', 'danger', 2000);
            });
            var postSendApc = {
                aCode: _this.dataFireBase.pathFireBase,
                emailAdm: _this.dataFireBase.email,
                pURL: _this.dataFireBase.fileurl,
                aName: _this.dataFireBase.filename,
                aSize: _this.dataFireBase.filesize,
                aType: _this.dataFireBase.fileext2,
                aFileTitle: _this.dataFireBase.filetitle,
                aFileHash: _this.dataFireBase.filehash,
                aTypeSign: _this.dataFireBase.type
            };
            _this._onboarding.postFirebase(postSendApc).subscribe(function (res) {
                console.log('BIEN');
            }, function (err) {
                _this._comp.presentToast('Problemas con firma ApiRest', 'danger', 2000);
            });
        });
    };
    __decorate([
        core_1.Output()
    ], FirmaPage.prototype, "change");
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], FirmaPage.prototype, "slidesPadre");
    FirmaPage = __decorate([
        core_1.Component({
            selector: 'app-firma',
            templateUrl: './firma.page.html',
            styleUrls: ['./firma.page.scss']
        })
    ], FirmaPage);
    return FirmaPage;
}());
exports.FirmaPage = FirmaPage;
