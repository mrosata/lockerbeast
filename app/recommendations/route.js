import Em from 'ember';

const headlineInfo = {
  text: 'Recommendation Listings',
  icon: 'news',
  letter: 'R'
};

export default Em.Route.extend({

  model() {
    return this.store.query('recommendation', {orderBy: 'date', limitToLast: 20});
  },

  setupController() {
    this._super(...arguments);
    set(this, 'controller.model', get(this, 'context'));
    set(this, 'controller.actions', get(this, 'actions'));
    set(this, 'controller.headlineInfo', headlineInfo);
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('recommendation', formValues)
        .then(() =>
        get(this, 'controller.model').update());
    }
  }
});
