import Ember from 'ember';

export function ifLte([val1, val2, printLnTrue = '', printLnFalse = '']) {
  return +val1 <= +val2 ? printLnTrue : printLnFalse;
}

export default Ember.Helper.helper(ifLte);
