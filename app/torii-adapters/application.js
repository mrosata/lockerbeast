import Em from 'ember';
//import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default Em.Object.extend({
  store: Em.inject.service(),
  firebase: Em.inject.service(),


  /**
   * Extacts session information from authentication response
   *
   * @param {object} authentication - hash containing response payload
   * @return {Promise}
   */
  open(authentication) {
    return Em.RSVP.resolve({
      provider: authentication.provider,
      uid: authentication.uid,
      currentUser: authentication[authentication.provider]
    });
  },


  /**
   * Restore existing authenticated session
   *
   * @return {Promise}
   */
  fetch() {
    let firebase = this.get('firebase');
    return new Em.RSVP.Promise((resolve, reject) => {
      let auth = firebase.getAuth();
      if (!auth) {
        reject("No session available");
      } else {
        resolve(this.open(auth));
      }
    }, "Firebase Torii Adapter#fetch Firebase session");
  },


  /**
   * Close existing authenticated session
   *
   * @return {Promise}
   */
  close() {
    let firebase = this.get('firebase');
    firebase.unauth();
    return Em.RSVP.resolve();
  }
});
