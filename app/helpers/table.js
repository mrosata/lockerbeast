import Ember from 'ember';

export function table() {
  console.table(...arguments);
  return '';
}

export default Ember.Helper.helper(table);
