"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContryComponent = void 0;
var core_1 = require("@angular/core");
var ContryComponent = /** @class */ (function () {
    function ContryComponent(_modal, _conuntry) {
        this._modal = _modal;
        this._conuntry = _conuntry;
        this.textFilter = '';
    }
    ContryComponent.prototype.ngOnInit = function () {
        this.getItems();
    };
    ContryComponent.prototype.filter = function (event) {
        var texto = event.target.value;
        this.textFilter = texto;
    };
    ContryComponent.prototype.getItems = function () {
        this.countries = this._conuntry.getCountries();
    };
    ContryComponent.prototype.closeModal = function (country) {
        this._modal.dismiss({
            country: country
        });
    };
    __decorate([
        core_1.Input()
    ], ContryComponent.prototype, "country");
    ContryComponent = __decorate([
        core_1.Component({
            selector: 'app-contry',
            templateUrl: './contry.component.html',
            styleUrls: ['./contry.component.scss']
        })
    ], ContryComponent);
    return ContryComponent;
}());
exports.ContryComponent = ContryComponent;
