import Em from 'ember';

export default Em.Service.extend({

  store: Em.inject.service(),
  session: Em.inject.service(),


  user: Em.computed('session.uid', function() {
    return this.get('store').find('member', this.get('session.uid'));
  }),
  /**
   * Logout the current user from Firebase using global session.
   * @returns {Em.RSVP.Promise}
   */
  logout() {
    this.get('session').fetch('firebase').finally(() => this.get('session').close('firebase'));
  },


  /**
   * Return Firebase.Promise from createUserWithEmailAndPassword API call.
   * @param newUser
   * @returns {Em.RSVP.Promise}
   */
  signUpUser(newUser){
    const fbAuth = firebase.auth();

    return fbAuth.createUserWithEmailAndPassword( newUser.get('email'), newUser.get('createPassword'));
  },


  /**
   * Login through Firebase using the session service
   * @param email
   * @param password
   * @returns {Em.RSVP.Promise}
   */
  login(email, password) {
    // Get the current Em Firebase session ( Torii )
    return this.get('session').open('firebase', {
      provider: 'password',
      email: email,
      password: password
    });
  },


  /**
   * Create a new user profile model and save it.
   * @param newUser
   * @return {Promise}
   */
  createUserProfile(newUser) {

    let userRecord = this.get('store').createRecord('member', {
      id: this.get('session.uid'),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      birthday: moment(newUser.birthday, 'YYYY-MM-DD').utc().toISOString(),
      username: newUser.username,
      country: newUser.country,
      gender: newUser.gender,
      email: newUser.email
    });

    return userRecord.save();
  }

});
