import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    get(this, 'auth').logout()
      .finally(() =>
        this.transitionTo('welcome.index'));
  }
});
