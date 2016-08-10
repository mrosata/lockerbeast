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
    Em.set.apply(this, [this, 'controller.headlineInfo', headlineInfo]);
    Em.set.apply(this, [this, 'controller.model', Em.get.apply(this, [this, 'context'])]);
    Em.set.apply(this, [this, 'controller.actions', Em.get.call(this, this, 'actions')]);
    /*this.set('controller.model', get(this, 'context'));
    this.set('controller.actions', get(this, 'actions'));
    this.set('controller.headlineInfo', headlineInfo);
  */},

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('recommendation', formValues)
        .then(() =>
        get(this, 'controller.model').update());
    }
  }
});
