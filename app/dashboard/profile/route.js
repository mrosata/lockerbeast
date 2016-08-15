import Ember from 'ember';

export default Ember.Route.extend({

  setupController() {
    this._super(...arguments);
    set(this, 'controller.model', get(this, 'context'));
  }
});
