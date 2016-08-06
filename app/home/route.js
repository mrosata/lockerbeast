import Em from 'ember';

export default Em.Route.extend({

  model() {
    return {
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
          attr: 'url',
          type: 'text',
          default: '',
          label: 'URL:',
          class: 'form-control'
        }],

      passThroughFields: {
        member: this.store.find('member', this.get('session.uid'))
      }
    };
  },

  setupController() {
    this._super(...arguments);
    this.set('controller.model', get(this, 'context'));
    this.set('controller.actions', get(this, 'actions'));
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('recommendation', formValues)
        .then(r => Em.Logger.info('created new model!', r));
    }
  }
});
