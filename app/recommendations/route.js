import Em from 'ember';

const headlineInfo = {
  text: 'Recommendation Listings',
  icon: 'news',
  letter: 'R'
};

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
          attr: 'url',
          type: 'text',
          default: '',
          label: 'URL:',
          class: 'form-control'
        }, {
          attr: 'date',
          type: 'text',
          default: '',
          label: 'Current Date:',
          fieldWrapperClass: 'col-sm-4',
          transform(dateVal) {
            return moment.utc(dateVal).unix();
          },
          class: 'form-control'
        }, {
          attr: 'image',
          type: 'firebase-file',
          default: '',
          label: 'Image:',
          fieldWrapperClass: 'col-sm-4'
        }],

      passThroughFields: {
        member: this.store.find('member', this.get('session.uid'))
      }
    });
  },

  setupController() {
    this._super(...arguments);
    this.set('controller.model', get(this, 'context'));
    this.set('controller.recommendations', get(this, 'context.recommendations'));
    this.set('controller.actions', get(this, 'actions'));
    this.set('controller.headlineInfo', headlineInfo);
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('recommendation', formValues).then();
    }
  }
});
