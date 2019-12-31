"use strict";
exports.__esModule = true;
var math = require("mathjs");
var MetricImperial = /** @class */ (function () {
    function MetricImperial() {
        this._availableUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'L'];
        this._matchValueAndUnitRegex = /([0-9.\/]*)([a-z]*)/;
        this._unitMappings = {
            gal: 'gallons',
            l: 'liters',
            lbs: 'pounds',
            kg: 'kilograms',
            mi: 'miles',
            km: 'kilometers'
        };
        this._reverseMap = {
            gal: 'l',
            l: 'gal',
            lbs: 'kg',
            kg: 'lbs',
            mi: 'km',
            km: 'mi'
        };
        var gallonToLitre = 3.78541;
        var lbsToKilogram = 0.453592;
        var mileToKilometer = 1.60934;
        this._convert = {
            gal: function (value) { return (value * gallonToLitre).toFixed(5); },
            l: function (value) { return (value / gallonToLitre).toFixed(5); },
            lbs: function (value) { return (value * lbsToKilogram).toFixed(5); },
            kg: function (value) { return (value * lbsToKilogram).toFixed(5); },
            mi: function (value) { return (value / mileToKilometer).toFixed(5); },
            km: function (value) { return (value * mileToKilometer).toFixed(5); }
        };
    }
    MetricImperial.prototype.processExpression = function (input) {
        var _a = this._matchValueAndUnitRegex.exec(input), value = _a[1], unit = _a[2];
        if (!unit) {
            return {
                error: 'no unit'
            };
        }
        if (!this._availableUnits.includes(unit)) {
            return {
                error: 'invalid unit'
            };
        }
        if (!value) {
            value = 1;
        }
        value = value.replace(/[^-()\d/*+.]/g, '');
        value = math.evaluate(value);
        var returnUnit = this._reverseMap[unit.toLowerCase()];
        var returnNum = this._convert[returnUnit](value);
        return {
            initNum: value,
            initUnit: unit,
            returnNum: returnNum,
            returnUnit: returnUnit,
            string: value + " " + this._unitMappings[unit] + " converts to " + returnNum + " " + this._unitMappings[returnUnit]
        };
    };
    return MetricImperial;
}());
exports["default"] = new MetricImperial();
