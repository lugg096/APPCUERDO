"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PortService = void 0;
var core_1 = require("@angular/core");
var country_type_1 = require("../types/country.type");
var PortService = /** @class */ (function () {
    function PortService() {
        this.countries = [
            new country_type_1.Country({
                name: 'Perú',
                flag: 'pe'
            }),
            new country_type_1.Country({
                name: 'Chile',
                flag: 'cl'
            }), new country_type_1.Country({
                name: 'Argentina',
                flag: 'ar'
            }), new country_type_1.Country({
                name: 'Brazil',
                flag: 'br'
            }),
            new country_type_1.Country({
                name: 'Bolivia',
                flag: 'bo'
            }),
            new country_type_1.Country({
                name: 'Colombia',
                flag: 'co'
            }),
            new country_type_1.Country({
                name: 'Costa Rica',
                flag: 'cr'
            }),
            new country_type_1.Country({
                name: 'Cuba',
                flag: 'cu'
            }),
            new country_type_1.Country({
                name: 'El Salvador',
                flag: 'sv'
            }),
            new country_type_1.Country({
                name: 'Guatemala',
                flag: 'gt'
            }),
            new country_type_1.Country({
                name: 'Honduras',
                flag: 'hn'
            }),
            new country_type_1.Country({
                name: 'Mexico',
                flag: 'mx'
            }),
            new country_type_1.Country({
                name: 'Nicaragua',
                flag: 'ni'
            }),
            new country_type_1.Country({
                name: 'Paraguay',
                flag: 'py'
            }),
            new country_type_1.Country({
                name: 'Republica Dominicana',
                flag: 'do'
            }),
            new country_type_1.Country({
                name: 'Uruguay',
                flag: 'uy'
            }),
            new country_type_1.Country({
                name: 'España',
                flag: 'es'
            }),
            new country_type_1.Country({
                name: 'Italy',
                flag: 'it'
            }), new country_type_1.Country({
                name: 'Spain',
                flag: 'es'
            }), new country_type_1.Country({
                name: 'Panama',
                flag: 'pa'
            }), new country_type_1.Country({
                name: 'United States',
                flag: 'us'
            }), new country_type_1.Country({
                name: 'Australia',
                flag: 'au'
            }), new country_type_1.Country({
                name: 'Venezuela',
                flag: 've'
            }), new country_type_1.Country({
                name: 'Ecuador',
                flag: 'ec'
            }), new country_type_1.Country({
                name: 'France',
                flag: 'fr'
            })
        ];
    }
    /*
      getCountries(page?: number, size?: number): Country[] {
        let countries = [];
    
        if (page && size) {
          countries = this.countries.slice((page - 1) * size, ((page - 1) * size) + size);
        } else {
          countries = this.countries;
        }
    
        return countries;
      } */
    PortService.prototype.getCountries = function () {
        return this.countries;
    };
    PortService.prototype.getCountry = function (flag) {
        return this.countries.filter(function (port) {
            return port.name.toLowerCase().indexOf(flag) !== -1;
        });
    };
    /*   filterPorts(ports: Port[], text: string){
        return ports.filter(port => {
          return port.name.toLowerCase().indexOf(text) !== -1 ||
            port.country.name.toLowerCase().indexOf(text) !== -1;
        });
      } */
    PortService.prototype.isInteger = function (value) {
        return value === parseInt(value, 10);
    };
    PortService.prototype.formatNumber = function (value, length) {
        var formattedNumber = '';
        for (var i = 0; i < length; i++) {
            formattedNumber += '0';
        }
        return (formattedNumber + value).slice(-length);
    };
    PortService.prototype.formatTimeZone = function (offset) {
        if (offset === 0) {
            return 'Z';
        }
        if (!this.isInteger(offset)) {
            return '';
        }
        // Time zones vary from -12:00 to 14:00.
        if (offset < -720 || offset > 840) {
            return '';
        }
        var sign = '+';
        if (offset < 0) {
            offset *= -1;
            sign = '-';
        }
        var minutes = offset % 60, hours = (offset - minutes) / 60;
        return sign + this.formatNumber(hours, 2) + ':' + this.formatNumber(minutes, 2);
    };
    PortService = __decorate([
        core_1.Injectable()
    ], PortService);
    return PortService;
}());
exports.PortService = PortService;
