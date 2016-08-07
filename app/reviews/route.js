import Em from 'ember';

export default Em.Route.extend({

  model() {
    return Em.RSVP.hash({
      recommendations: this.store.query('recommendation', {orderBy: 'date', limitToLast: 20}),

      // This is the example form which will be decomposed into HTML in the
      // component.
      formFields: [
        {
          attr: 'title',
          type: 'text',
          default: '',
          required: true,
          label: 'Title:',
          class: 'form-control',
          validation: (value) => value
        }, {
          attr: 'body',
          type: 'text',
          default: '',
          required: true,
          label: 'Body:',
          class: 'form-control',
          validation: (value) => value.length > 1
        }, {
          attr: 'date',
          type: 'text',
          default: '',
          inlineLabel: 'Current Date:',
          transform(dateVal) {
            return moment.utc(dateVal).unix();
          },
          class: 'form-control'
        }, {
          attr: 'image',
          type: 'firebase-file',
          default: '',
          label: 'Image:',
          class: 'form-control'
        }],

      passThroughFields: {
        member: this.store.find('member', this.get('session.uid'))
      }
    });
  },

  setupController() {
    this._super(...arguments);
    this.set('controller.model', get(this, 'context'));
    this.set('controller.actions', get(this, 'actions'));
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('review', formValues)
        .then(r => Em.Logger.info('created new model!', r));
    }
  }
});
