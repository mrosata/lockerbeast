import Em from 'ember';

export default Em.Route.extend({

  model() {
    return {};
  },

  setupController() {
    this._super(...arguments);
    this.set('controller.model', get(this, 'context'));
  }
});
