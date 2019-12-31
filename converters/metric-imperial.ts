import * as math from 'mathjs';

class MetricImperial {
  
  _availableUnits: any;
  _matchValueAndUnitRegex: any;
  _unitMappings: any;
  _reverseMap: any;
  _convert: any;

  constructor() {
    this._availableUnits = ['gal','l','mi','km','lbs','kg','L'];
    this._matchValueAndUnitRegex = /([0-9.\/]*)([a-z]*)/;
    
    this._unitMappings = {
      gal: 'gallons',
      l: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    }
    
    this._reverseMap = {
      gal: 'l',
      l: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    }
    
    const gallonToLitre = 3.78541;
    const lbsToKilogram = 0.453592;
    const mileToKilometer = 1.60934;
    
    this._convert = {
      gal: (value) => (value * gallonToLitre).toFixed(5),
      l: (value) => (value / gallonToLitre).toFixed(5),
      lbs: (value) => (value * lbsToKilogram).toFixed(5),
      kg: (value) => (value * lbsToKilogram).toFixed(5),
      mi: (value) => (value / mileToKilometer).toFixed(5),
      km: (value) => (value * mileToKilometer).toFixed(5)
    }
  }
  
  processExpression(input) {
    
    let [, value, unit] = this._matchValueAndUnitRegex.exec(input);
    
    if(!unit) {
      return {
        error: 'no unit'
      }
    }
    
    if(!this._availableUnits.includes(unit)) {
      return {
        error: 'invalid unit'
      }
    }
    
    if(!value) {
      value = 1;
    }
    
    value = value.replace(/[^-()\d/*+.]/g, '');
    value = math.evaluate(value);
    
    const returnUnit = this._reverseMap[unit.toLowerCase()];
    const returnNum = this._convert[returnUnit](value);
    
    return {
      initNum: value,
      initUnit: unit,
      returnNum,
      returnUnit,
      string: `${value} ${this._unitMappings[unit]} converts to ${returnNum} ${this._unitMappings[returnUnit]}`
    }
  }
  
}

export default new MetricImperial()