import Em from 'ember';
import _ from 'lodash';

const headlineInfo = {
  text: 'Recommendation Listings',
  icon: 'news',
  letter: 'R'
};

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
          attr: 'category',
          type: 'select',
          default: '',
          label: 'Category:',
          class: 'form-control',
          prompt: '--- Select Category ---',
          required: true,
          optionsPromise: this.store.findAll('category')
            .then(categories => categories.toArray()
              .map(category => {
                return {
                  value: get(category, 'id'),
                  text: get(category, 'name'),
                  description: get(category, 'description')
                };
              })
            )
        }, {
          attr: 'tags',
          type: 'text',
          default: '',
          label: 'Tags (separate by commas):',
          class: 'form-control',
          transform: (x) => x.split(',').map(s => s.trim()).filter(x => !!x)
        },
        {
          attr: 'image',
          type: 'firebase-file',
          default: '',
          label: 'Image:',
          fieldWrapperClass: 'col-sm-4'
        }, {
          attr: 'date',
          type: 'hidden',
          default: '',
          transform: () => moment.utc().unix()
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
    this.set('controller.headlineInfo', headlineInfo);
  },

  actions: {
    onSubmitForm(formValues) {
      this.recordFactory.createNew('review', formValues).then();
    }
  }
});
