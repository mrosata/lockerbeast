import Em from 'ember';

const birthdayRE = /\d{4}-\d{2}-\d{2}/;

export default Em.Component.extend({

  classNames: ['col-md-12', 'section-post-comment'],
  title: 'Sign-up',

  /**
   * Because components are singletons, we should re-create the field values any
   * time that the form is re-inserted on the page
   */
  willInsertElement() {
    this._super(...arguments);
    Em.run.once(() => {
      this.set('formValues', Em.Object.create({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        birthday: '',
        gender: 'unspecified',
        // These are just the field values.
        createPassword: '',
        confirmPassword: ''
      }));
    });
  },


  /**
   * Computed property which reflects whether the form has been completely filled out.
   * //TODO: Better validation would be nice. IE: Email
   */
  submitIsDisabled: Em.computed('formValues.createPassword', 'formValues.confirmPassword', 'formValues.username',
    'formValues.firstName', 'formValues.lastName', 'formValues.birthday', 'formValues.email', 'formValues.gender',
    function() {

      if (!this.get('formValues.username') || this.get('formValues.username.length') < 4) {
        return true;
      }
      if (this.get('formValues.confirmPassword') !== this.get('formValues.createPassword') || this.get('formValues.confirmPassword') < 4 ) {
        return true;
      }

      // If the function hasn't returned yet then the only value left to test is birthday
      return !this.get('formValues.birthday').match(birthdayRE);
    }),
  

  actions: {

    /**
     * Send submitted form data out to handler.
     * Triggered from action fired on submit.
     *
     * @returns {void}
     * @private
     */
    onSubmitForm() {
      this.sendAction('onSubmitForm', this.get('formValues'));
    }
  }
});

