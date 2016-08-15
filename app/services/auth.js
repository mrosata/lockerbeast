import Em from 'ember';
import _ from 'lodash';

export default Em.Service.extend({

  store: Em.inject.service(),
  session: Em.inject.service(),
  firebaseApp: Em.inject.service(),

  member: null,
  ratings: [],

  init() {
    this._super(...arguments);
    const session = get(this, 'session');
    session.addObserver('isAuthenticated', _.bind(this.setUserIfSessionUp, this, session));
  },

  setUserIfSessionUp(session) {

    if (get(session, 'isAuthenticated')) {

      get(this, 'store')
        .find('member', get(session, 'uid'))
        .then(member => {
          set(this, 'member', member);
          set(this, 'memberRatings', member.get('ratings') || []);
        });
    }
  },

  /**
   * Logout the current user from Firebase using global session.
   * @returns {Em.RSVP.Promise}
   */
  logout() {
    this.get('session').fetch('firebase')
      .finally(
        () => this.get('session').close('firebase'));
  },


  /**
   * Return Firebase.Promise from createUserWithEmailAndPassword API call.
   * @param newUser
   * @returns {Em.RSVP.Promise}
   */
  signUpUser(newUser){
    const fbAuth = get(this, 'firebaseApp').auth();

    return fbAuth.createUserWithEmailAndPassword(
      _.toLowerCase( newUser.get('email')), newUser.get('createPassword'));
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
  createUserProfile(newUser, session) {

    let userRecord = get(this, 'store')
      .createRecord('member', {
        id: get(session, 'uid'),
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
