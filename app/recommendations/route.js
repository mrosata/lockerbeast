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
    this.set('controller.model', get(this, 'context'));
    this.set('controller.actions', get(this, 'actions'));
    this.set('controller.headlineInfo', headlineInfo);
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('recommendation', formValues).then();
    }
  }
});
