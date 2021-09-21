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
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var js_sha256_1 = require("js-sha256");
var sha1 = require("js-sha1");
var core_2 = require("@capacitor/core");
var Camera = core_2.Plugins.Camera;
var forms_1 = require("@angular/forms");
var contry_component_1 = require("../components/contry/contry.component");
var country_type_1 = require("../types/country.type");
var HomePage = /** @class */ (function () {
    function HomePage(formBuilder, _storage, router, _modal, _comp, loadingController, _onboarding) {
        this.formBuilder = formBuilder;
        this._storage = _storage;
        this.router = router;
        this._modal = _modal;
        this._comp = _comp;
        this.loadingController = loadingController;
        this._onboarding = _onboarding;
        this.submitAttempt = false;
        this.claveValida = false;
        this.pin = "";
        this.alias = "Nueva wallet";
        this.wallets = [];
        this.imagen = '';
        this.fraseSeguridad = false;
        this.fotoSeguridad = false;
        this.palabrasPrincipal = []; //Palbras Slide 1 
        this.textValue = '';
        this.palabras = [];
        this.palabrasVerif = [];
        this.slideOptsOnboarding = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        this.dataSetCredential = {
            operacion: 'setCredential',
            dniHash: '',
            nameHash: '',
            emailHash: '',
            aliasHash: '',
            photoHash: '',
            dataHash: 'prueba',
            privateKey: ''
        };
        /* Codigo pin */
        this.dataSlideCreate = {
            titulo: "PASO 2",
            subTitulo: "Crear ePIN",
            texto: "Nuevo ePIN de 6 dígitos"
        };
        this.dataSlideValidacion = {
            titulo: "PASO 3",
            subTitulo: "Confirme su ePIN",
            texto: "Ingrese nuevamente ePIN de 6 dígitos"
        };
        this.country = new country_type_1.Country({
            name: 'Perú',
            flag: 'pe'
        });
        this.dataUserForm = formBuilder.group({
            country: ['pe', forms_1.Validators.required],
            dni: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            apellido: ['', forms_1.Validators.required],
            alias: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[^@]+@[^@]+\.[^@]+$")]]
            /* email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]] */
        });
    }
    HomePage.prototype.ngOnInit = function () {
        /*     this._onboarding.validarDNI('72930739').subscribe(res=>{
              console.log('RESPUESTA',res);
              
            }) */
    };
    HomePage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._storage.appIniciado = false;
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.selectContry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._modal.create({
                            component: contry_component_1.ContryComponent,
                            componentProps: {
                                country: this.country
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.country = res.data.country;
                                this.dataUserForm.controls['country'].setValue(res.data.country.flag);
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.firstSlide = function () {
        this.backSlidePadre();
        this.backSlidePadre();
        this.backSlidePadre();
        this.backSlidePadre();
    };
    HomePage.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
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
                        this._onboarding.getAccount().subscribe(function (res) {
                            loading.dismiss();
                            _this._storage.datos.ADDRESS = res.address;
                            _this._storage.datos.DID = sha1(js_sha256_1.sha256(res.address));
                            _this._storage.datos.privateKey = res.privateKey;
                            _this.dataSetCredential.privateKey = res.privateKey;
                            _this._storage.datos.publicKey = res.publicKey;
                            console.log(res);
                            console.log(_this.dataSetCredential);
                        }, function (err) {
                            console.log(err);
                            loading.dismiss();
                            _this._comp.presentToast('Error con servidor getAccount', 'danger', 1000);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.procesarImagen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var capturedPhoto;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Camera.getPhoto({
                            resultType: core_2.CameraResultType.Base64,
                            source: core_2.CameraSource.Camera,
                            correctOrientation: true
                        }).then(function (imageData) {
                            if (imageData) {
                                _this._storage.datos.PHOTO = 'data:image/jpg;base64,' + imageData.base64String; // hash Foto
                                _this._comp.resizeImage('data:image/png;base64,' + imageData.base64String).then(function (res) {
                                    _this._storage.datos.PHOTO_MIN = res;
                                });
                                _this.nextSlidePadre();
                            }
                        }, function (err) {
                            console.log('Ocurrió un problema, vuelva a intentarlo porfavor: ' + err);
                        })];
                    case 1:
                        capturedPhoto = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.setCredential = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
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
                        this._onboarding.setCredential(this.dataSetCredential).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 7, , 8]);
                                        this._storage.datos.creadentialSignature = res;
                                        return [4 /*yield*/, this._storage.setLocalStorage('DATA', this._storage.datos)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this._storage.setLocalStorage('FIRMAS', [])];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, this._storage.setLocalStorage('BIOCARDS', [])];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, this._storage.setLocalStorage('TRANSFERENCIAS', [])];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, this._storage.setLocalStorage('CREDIFIRMAS', 5)];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, this._storage.setLocalStorage('VALID_EMAIL', false)];
                                    case 6:
                                        _a.sent();
                                        return [3 /*break*/, 8];
                                    case 7:
                                        e_1 = _a.sent();
                                        alert('Ocurrió un problema en storage de su equipo: ' + e_1);
                                        this.firstSlide();
                                        return [3 /*break*/, 8];
                                    case 8:
                                        loading.dismiss();
                                        this.nextSlidePadre();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            _this.firstSlide();
                            loading.dismiss();
                            console.log(err);
                            _this._comp.presentToast('Error con servidor setCredential', 'danger', 1000);
                        });
                        this._onboarding.sendValidationEmail({
                            email: this._storage.datos.EMAIL,
                            dni: this._storage.datos.DNI,
                            did: this._storage.datos.DID
                        }).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log('comprobarCode', res);
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            console.log(err);
                            _this._comp.presentToast('Error con servidor validacion email', 'danger', 1000);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.saveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                this.submitAttempt = true;
                if (this.dataUserForm.valid) {
                    this._storage.datos.NAME = this.dataUserForm.value.name.trim() + ' ' + this.dataUserForm.value.apellido.trim();
                    this._storage.datos.DNI = this.dataUserForm.value.dni.toString().trim();
                    this._storage.datos.EMAIL = this.dataUserForm.value.email.trim();
                    this._storage.datos.ALIAS = this.dataUserForm.value.alias.trim();
                    /* Base64 */
                    this._storage.datos.NAME_B64 = btoa(this._storage.datos.NAME);
                    this._storage.datos.DNI_B64 = btoa(this._storage.datos.DNI);
                    this._storage.datos.EMAIL_B64 = btoa(this._storage.datos.EMAIL);
                    /* SIMBOX ID */
                    this._storage.datos.SINBOX_ID = js_sha256_1.sha256(this._storage.datos.EMAIL.toLowerCase());
                    this.dataSetCredential.nameHash = js_sha256_1.sha256(this._storage.datos.NAME);
                    this.dataSetCredential.dniHash = js_sha256_1.sha256(this._storage.datos.DNI);
                    this.dataSetCredential.emailHash = js_sha256_1.sha256(this._storage.datos.EMAIL);
                    this.dataSetCredential.aliasHash = js_sha256_1.sha256(this._storage.datos.ALIAS);
                    this.dataSetCredential.photoHash = js_sha256_1.sha256(this._storage.datos.PHOTO);
                    data = {
                        id: '111111111',
                        dni: '72930739',
                        pic: this._storage.datos.PHOTO
                    };
                    this._onboarding.validarPhoto(data).subscribe(function (res) {
                        console.log('RESPUESTA', res);
                    });
                    /*   this.nextSlidePadre(); */
                }
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.goInicio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['/app/inicio']);
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    HomePage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    HomePage.prototype.getClave = function ($event) {
        this.pin = $event;
        this.nextSlidePadre();
    };
    HomePage.prototype.getClaveValid = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var position, n1, n2, str, hex1, number1, hex2, number2;
            return __generator(this, function (_a) {
                if (this.pin == $event) {
                    this._storage.datos.PIN = js_sha256_1.sha256(js_sha256_1.sha256(this.pin.toString()));
                    position = Number(this.pin.substr(0, 2));
                    if (position > 62)
                        position = position - 62;
                    if (position == 0)
                        position = 2;
                    n1 = Number(this.pin.substr(2, 2));
                    n2 = Number(this.pin.substr(4, 2));
                    str = this._storage.datos.privateKey.substr(position, 4);
                    hex1 = str.substr(0, 2);
                    number1 = parseInt(hex1, 16) + n1;
                    hex2 = str.substr(2, 2);
                    number2 = parseInt(hex2, 16) + n2;
                    this._storage.datos.privateKey = this._storage.datos.privateKey.substr(0, position) +
                        this._storage.datos.privateKey.substr(position + 4, this._storage.datos.privateKey.length) +
                        number1 + 'G' + number2;
                    this.setCredential();
                }
                else
                    this._comp.presentToast('Clave no es la misma', 'danger', 1000);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], HomePage.prototype, "slidesPadre");
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
