import Ember from 'ember';

export function ifEqual([a, b, res1 = '', res0 = '']) {
  return a === b ? res1 : res0;
}

export default Ember.Helper.helper(ifEqual);
