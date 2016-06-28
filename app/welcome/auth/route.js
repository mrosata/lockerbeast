/**
 * This route handles auth flows after the user logs into
 * an external site and is redirected back to this page.
 */
import Em from 'ember';

// /welcome/auth#access_token=3246115561.1ae330b.a0c7301bdb254081b91fd675c0de6946
export default Em.Route.extend({

  beforeModel() {
    let hash = Em.Location._location.hash;
    // Check that we have a hash string
    if (typeof hash !== "string" && hash.length < 2) {
      this.transitionTo('welcome');
    }
    const [key, accessToken] = hash.slice(1).split('=');
    if (key === 'access_token') {
      return new Em.RSVP.Promise((resolve, reject) => {
        Em.$.ajax({
          url: `https://api.instagram.com/v1/users/self/?access_token=${accessToken}`,
          type: 'GET',
          dataType: 'jsonp',
          success: resolve,
          error: reject
        });
      }).then(auth => {
        if (auth.meta.code === 200 && !!auth.data.username && !!auth.data.id) {
          Em.Logger.info('AUTH returned good! ', auth);

          this.get('session').open('firebase', {
            email: `${auth.data.username}@lockerbeast.instagram.com`,
            password: auth.data.id
          });
        }
      }).catch(error => {
        Em.Logger.error('AUTH returned bad! ', error);
      });
    }
  }

});
