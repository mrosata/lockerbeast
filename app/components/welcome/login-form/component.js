import Em from 'ember';

export default Em.Component.extend({

  classNames: ['col-md-12'],
  title: 'Login',

  /**
   * Because components are singletons, we should re-create the field values any
   * time that the form is re-inserted on the page so that username isn't filled in.
   */
  willInsertElement() {
    this._super(...arguments);
    Em.run.once(() => {
      this.set('formValues', Em.Object.create({
        username: '',
        password: ''
      }));
    });
  },


  /**
   * Computed property which reflects whether the form has been completely filled out.
   */
  loginIsDisabled: Em.computed('formValues.password', 'formValues.username',
    function() {
      if (!this.get('formValues.username') || this.get('formValues.username.length') < 6) {
        return true;
      }
      return !this.get('formValues.password') || this.get('formValues.password.length') < 6;
    }),


  actions: {
    /**
     * Send submitted login data out to handler.
     * Triggered from action fired on submit.
     *
     * @returns {void}
     * @private
     */
    onLoginSubmit() {
      this.sendAction('onLoginSubmit', this.get('formValues'));
    }
  }
});

