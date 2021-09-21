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
exports.Tab3Page = void 0;
var core_1 = require("@angular/core");
var ver_foto_component_1 = require("src/app/components/ver-foto/ver-foto.component");
var generar_code_qr_component_1 = require("src/app/components/generar-code-qr/generar-code-qr.component");
var Tab3Page = /** @class */ (function () {
    function Tab3Page(loadingController, _storage, socialSharing, actionSheetController, dataLocal, _modal, router) {
        this.loadingController = loadingController;
        this._storage = _storage;
        this.socialSharing = socialSharing;
        this.actionSheetController = actionSheetController;
        this.dataLocal = dataLocal;
        this._modal = _modal;
        this.router = router;
        this.addres = 'null';
        this.slideOpts = {
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
    }
    Tab3Page.prototype.ngOnInit = function () {
        this.getData();
    };
    Tab3Page.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.addres = this._storage.datos.ADDRESS;
                this.codeQRmin = this.addres.substring(0, 7) + "..." + this.addres.substring(this.addres.length - 7, this.addres.length);
                return [2 /*return*/];
            });
        });
    };
    Tab3Page.prototype.verQR = function (title, codeQR, subTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._modal.create({
                            component: generar_code_qr_component_1.GenerarCodeQRComponent,
                            componentProps: {
                                title: title,
                                codeQR: codeQR,
                                subTitle: subTitle,
                                label1: '',
                                text1: codeQR,
                                textoShare: 'Mi ' + subTitle + ' de Appcuerdo es ' + codeQR
                            }
                        }).then(function (modal) { return modal.present(); })];
                    case 1:
                        modal = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab3Page.prototype.compartirDireccion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.socialSharing.share('Este es mi DID de Appcuerdo : ', '', '', this.addres);
                return [2 /*return*/];
            });
        });
    };
    Tab3Page.prototype.goInicio = function () {
        this.router.navigate(['/app/inicio']);
    };
    Tab3Page.prototype.verFoto = function (path) {
        this._modal.create({
            component: ver_foto_component_1.VerFotoComponent,
            componentProps: {
                img: path
            }
        }).then(function (modal) { return modal.present(); });
    };
    Tab3Page.prototype.generarQR = function () {
        this._modal.create({
            component: generar_code_qr_component_1.GenerarCodeQRComponent,
            componentProps: {
                codeQR: localStorage.getItem('ADDRESS')
            }
        }).then(function (modal) { return modal.present(); });
    };
    Tab3Page = __decorate([
        core_1.Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        })
    ], Tab3Page);
    return Tab3Page;
}());
exports.Tab3Page = Tab3Page;
