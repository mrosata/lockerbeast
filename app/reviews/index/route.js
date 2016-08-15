import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.query('review', {orderBy: 'date', limitToLast: 20});
  }
});
