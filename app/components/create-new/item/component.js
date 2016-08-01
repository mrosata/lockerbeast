import Em from 'ember';

export default Em.Component.extend({

  classNames: [],
  store: Em.inject.service(),
  title: 'Create Item',

  /**
   * Because components are singletons, we should re-create the field values any
   * time that the form is re-inserted on the page
   */
  willInsertElement() {
    this._super(...arguments);
    Em.run.once(() => {
      this.set('formValues', Em.Object.create({
        title: '',
        category: 'uncategorized',
        body: ''
      }));
    });
  },


  /**
   * Computed property which reflects whether the form has been completely filled out.
   */
  submitIsDisabled:
    Em.computed('formValues.title', 'formValues.category', 'formValues.body',
      function() {
        return !this.get('formValues.title') || !this.get('formValues.category') ||
          !this.get('formValues.body');
      }),


  actions: {
    /**
     * Send submitted form data out to handler.
     * Triggered from action fired on submit.
     *
     * @returns {void}
     * @private
     */
    onSubmitCreate() {
      // Make a regular `password` property.
      this.sendAction('onSubmitCreate', this.get('itemType'), this.get('formValues'));
    }
  }
});
