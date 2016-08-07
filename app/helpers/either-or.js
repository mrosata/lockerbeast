import Ember from 'ember';

export function eitherOr([a, b]) {
  return !a ? b : a;
}

export default Ember.Helper.helper(eitherOr);
