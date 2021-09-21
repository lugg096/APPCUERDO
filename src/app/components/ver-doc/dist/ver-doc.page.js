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
exports.VerDocPage = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var generar_code_qr_component_1 = require("../generar-code-qr/generar-code-qr.component");
var VerDocPage = /** @class */ (function () {
    function VerDocPage(_modal, socialSharing, _fireBase, alertController) {
        this._modal = _modal;
        this.socialSharing = socialSharing;
        this._fireBase = _fireBase;
        this.alertController = alertController;
        this.cancel = null;
        this.dataFire = {
            filename: '',
            filesize: '',
            creatoricon: '',
            fileimg: '',
            fileurl: ''
        };
        this.path = '';
        this.listDataDoc = [];
        this.listDataDoc_aux = [];
        this.slideOpts = {
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        this.pathOriginal = '';
        this.pathCredencial = '';
        this.pathDocCred = '';
        this.codeDoc = '';
        this.typeDoc = '';
        this.pathDoc = '';
        this.load = true;
    }
    VerDocPage.prototype.compartir = function () {
        this.socialSharing.share('Puedes ver el documento ' + this.dataFire.filetitle + ' desde: ', '', '', 'http://appcuerdo.com/filesout/sign_' + this.pathDoc);
    };
    VerDocPage.prototype.myBackButton = function () {
        this._modal.dismiss();
    };
    VerDocPage.prototype.invitar = function () {
        this._modal.create({
            component: generar_code_qr_component_1.GenerarCodeQRComponent,
            componentProps: {
                title: 'Invitar a firmar',
                codeQR: this.cancel ? this.data.pathCancelado : this.data.pathFireBase,
                subTitle: this.dataFire.filetitle,
                label1: 'Código de seguridad',
                text1: this.dataFire.pinvalue,
                textoShare: 'Firma el documento ' + this.dataFire.filetitle + ' usando el código este seguridad: ' + this.dataFire.pinvalue
            }
        }).then(function (modal) { return modal.present(); });
    };
    VerDocPage.prototype.verFirma = function () {
        var p1 = this.data.signature.substring(0, 10);
        var p2 = this.data.signature.substring(this.data.signature.length - 10, this.data.signature.length);
        var p3 = this.data.lacchain_tx.substring(0, 10);
        var p4 = this.data.lacchain_tx.substring(this.data.lacchain_tx.length - 10, this.data.lacchain_tx.length);
        this._modal.create({
            component: generar_code_qr_component_1.GenerarCodeQRComponent,
            componentProps: {
                title: 'Firma electrónica',
                codeQR: 'http://explorer.lacchain.net/tx/' + this.data.lacchain_tx,
                subTitle: 'Lacchain',
                label1: 'Firma (rawTransaction)',
                text1: p1 + '...' + p2,
                label2: 'Transacción (transactionHash)',
                text2: p3 + '...' + p4,
                textoShare: 'http://explorer.lacchain.net/tx/' + this.data.lacchain_tx
            }
        }).then(function (modal) { return modal.present(); });
    };
    VerDocPage.prototype.retrieveDoc = function () {
        var _this = this;
        console.log('Entro');
        this._fireBase.getAll(this.cancel ? this.data.pathCancelado : this.data.pathFireBase).snapshotChanges().pipe(operators_1.map(function (changes) {
            return changes.map(function (c) {
                return (__assign({ key: c.payload.key }, c.payload.val()));
            });
        })).subscribe(function (data) {
            _this.listDataDoc = data;
            _this.listDataDoc_aux = [];
            if (data.length < 4)
                _this.listDataDoc_aux = data;
            else
                for (var i = 0; i < 4; i++)
                    _this.listDataDoc_aux.push(data[i]);
            console.log('REAL TIMEEEEE', data);
            ;
        });
    };
    VerDocPage.prototype.name = function (nombre) {
        nombre = nombre.split(" ");
        if (nombre.length > 1)
            nombre = nombre[0] + " " + nombre[1].substr(0, 1);
        return nombre;
    };
    VerDocPage.prototype.nextSlide = function () {
        this.slides.slideNext();
    };
    VerDocPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.load = true;
        this._fireBase.singFirma(this.cancel ? this.data.pathCancelado : this.data.pathFireBase).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var pathDocArray;
            return __generator(this, function (_a) {
                this.dataFire = res;
                console.log('mostrar RESSS', res);
                this.path = this.dataFire.fileimg.replace(' ', '');
                console.log('IMG ORIGINAL', this.path);
                this.pathDoc = this.dataFire.fileurl.substr(27, this.dataFire.fileurl.length);
                pathDocArray = this.pathDoc.split(".");
                this.codeDoc = pathDocArray[0];
                this.typeDoc = pathDocArray[1].toUpperCase();
                console.log('VER CODE111', this.codeDoc);
                console.log('VER PDF', this.typeDoc);
                this.load = false;
                return [2 /*return*/];
            });
        }); });
        this.retrieveDoc();
    };
    VerDocPage.prototype.ngOnInit = function () {
    };
    VerDocPage.prototype.verUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user);
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'aler-imgDidUser',
                                message: ' <div class="text-center"><img class="imgUser" src="data:image/jpg;base64,' + user.photo + '"> </div> <p class="text-wrap text-left mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">' + user.name + ' </b> <br> <small style="color: darkgrey;"> <b>DID.</b>' + user.did + '</b> <br> <b>PublicKey.</b>' + user.public_key + '</small> </p>',
                                buttons: ['OK']
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
    __decorate([
        core_1.ViewChild('slides', { static: false })
    ], VerDocPage.prototype, "slides");
    VerDocPage = __decorate([
        core_1.Component({
            selector: 'app-ver-doc',
            templateUrl: './ver-doc.page.html',
            styleUrls: ['./ver-doc.page.scss']
        })
    ], VerDocPage);
    return VerDocPage;
}());
exports.VerDocPage = VerDocPage;
