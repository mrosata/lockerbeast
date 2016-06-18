import Em from 'ember';

export default Em.Component.extend({

  classNames: ['col-md-12', 'section-post-comment'],

  formIsReady: Em.computed('confirmedPass', 'email', 'username', function() {

    if (!this.get('username') || this.get('username.length') < 4) {
      return false;
    }
    if (!this.get('password.length') || !this.get('confirmPassword.length') ) {
      return false;
    }
    if (this.get('password.length') < 4 || this.get('confirmPassword.length') < 4 ) {
      return false;
    }
    if (this.get('password') !== this.get('confirmPassword')) {
      return false;
    }

    if (this.get('birthday') !== '') {
      //TODO: Get Ember validation for fields like this (if we keep the form that is).
      return false;
    }

    return true;

  }),

  confirmedPass: Em.computed('password', 'confirmPassword', function() {
    return this.get('password') === this.get('confirmPassword') ? this.get('password') : null;
  }),

  signUpUser() {

    if (!this.get('formIsReady')) {
      return false;
    }
    let newUser = {
      password: this.get('confirmedPass'),
      firstName: this.get('firstName'),
      lastName: this.get('lastName'),
      birthday: this.get('birthday'),
      username: this.get('username'),
      country: this.get('country'),
      gender: ( this.get('gender') || 'unspecified' ),
      email: this.get('email')
    };

    this.sendAction('signUpUser', newUser);
  }
});

