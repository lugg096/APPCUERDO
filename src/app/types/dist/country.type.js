"use strict";
exports.__esModule = true;
exports.Country = void 0;
var Country = /** @class */ (function () {
    function Country(country) {
        this.name = country.name;
        this.flag = country.flag;
    }
    Object.defineProperty(Country.prototype, "flagUrl", {
        get: function () {
            return "https://lipis.github.io/flag-icon-css/flags/4x3/" + this.flag + ".svg";
        },
        enumerable: false,
        configurable: true
    });
    return Country;
}());
exports.Country = Country;
