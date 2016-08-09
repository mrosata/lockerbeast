import Em from 'ember';
import {splitParagraphs} from 'lockerbeast/utils/ember-fp';

export default Em.Route.extend({

  model(params) {
    return this.store.find('recommendation', params.id);
  },

  setupController() {
    this._super(...arguments);

    const model = get(this, 'context');
    set(this,
      'controller.model', model);
    set(this,
      'controller.paragraphs', splitParagraphs(get(model, 'body')));
  }
});
