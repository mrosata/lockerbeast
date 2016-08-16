import Em from 'ember';

const headlineInfo = {
  text: 'Reviews Listings',
  icon: 'news',
  letter: 'R'
};

export default Em.Route.extend({

  model() {
    return this.store.query('review', {orderBy: 'date', limitToLast: 20});
  },

  setupController() {
    this._super(...arguments);
    set(this, 'controller.headlineInfo', headlineInfo);
    set(this, 'controller.model', get(this, 'context'));
    set(this, 'controller.actions', get(this, 'actions'));
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('review', formValues)
        .then(() =>
          get(this, 'controller.model').update());
    }
  }
});
