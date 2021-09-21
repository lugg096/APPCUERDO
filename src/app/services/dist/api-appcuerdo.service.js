"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiAppcuerdoService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var ApiAppcuerdoService = /** @class */ (function () {
    function ApiAppcuerdoService(_httpIonic, _http, navCtrl) {
        this._httpIonic = _httpIonic;
        this._http = _http;
        this.navCtrl = navCtrl;
        this.dominio = environment_1.environment.url;
    }
    ApiAppcuerdoService.prototype.getAccount = function () {
        var parametro = { operacion: 'getAccount' };
        return this._http.get(this.dominio, { params: parametro });
    };
    ApiAppcuerdoService.prototype.setCredential = function (data) {
        var parametro = data;
        console.log('Parametro', parametro);
        return this._http.get(this.dominio, { params: parametro });
    };
    ApiAppcuerdoService.prototype.sendValidationEmail = function (data) {
        console.log('MOSTRAR data', data);
        var URL = 'http://appcuerdo.com/send.php?mode=mail&to=' + data.email + '&did=' + data.did + '&dni=' + data.dni;
        return this._http.get(URL);
    };
    /* VALIDACION RENIEC */
    ApiAppcuerdoService.prototype.validarDNI = function (dni) {
        var URL = 'https://api.reniec.cloud/dni/' + dni;
        return this._http.get(URL);
    };
    ApiAppcuerdoService.prototype.validarPhoto = function (data) {
        var URL = 'http://identidad.bigdavi.com/api/facial';
        return this._http.post(URL, data);
    };
    /* FIRMAR */
    ApiAppcuerdoService.prototype.sendTransaction = function (data) {
        var parametro = data;
        console.log('Parametro', parametro);
        return this._http.get(this.dominio, { params: parametro });
    };
    ApiAppcuerdoService.prototype.get1 = function (data) {
        var URL = 'https://api.appcuerdo.com/v1/document/create/?modo=P&channel=' + data.aCode + '&hashBase64=' + data.aFileHashBase64 + '&hash=' + data.hash + "&sello=" + data.sello;
        return this._http.get(URL);
    };
    ApiAppcuerdoService.prototype.postFirebase = function (data) {
        var URL = 'https://appcuerdo.com/send.php/?mode=emailAdm&to=' + data.emailAdm + '&channel=' + data.aCode + "&html=" + btoa(data.pURL) + "&name=" + data.aName + "&size=" + data.aSize + "&type=" + data.aType + "&title=" + data.aFileTitle + "&hash=" + data.aFileHash + "&typeSign=" + data.aTypeSign;
        return this._http.get(URL);
    };
    ApiAppcuerdoService.prototype.getQR = function (url) {
        return this._http.get(url);
    };
    ApiAppcuerdoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiAppcuerdoService);
    return ApiAppcuerdoService;
}());
exports.ApiAppcuerdoService = ApiAppcuerdoService;
