import Em from 'ember';

export default Em.Component.extend({

  classNames: [],
  title: 'Create Rating',

  /**
   * Because components are singletons, we should re-create the field values any
   * time that the form is re-inserted on the page
   */
  willInsertElement() {
    this._super(...arguments);
    Em.run.once(() => {
      this.set('formValues', Em.Object.create({
        item: '',
        rating: ''
      }));
    });
  },


  /**
   * Computed property which reflects whether the form has been completely filled out.
   */
  submitIsDisabled: Em.computed('formValues.rating', 'formValues.rating', function() {
    return !this.get('formValues.rating');
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
      this.sendAction('onSubmitCreate', this.get('formValues'));
    }
  }
});
