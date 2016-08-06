import Ember from 'ember';

export function eitherOr(a, b) {
  return !!a ? a : b;
}

export default Ember.Helper.helper(eitherOr);
