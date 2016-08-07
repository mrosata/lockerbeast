import Em from 'ember';

export default Em.Route.extend({

  actions: {
    /**
     * Revoke user auth and then return them to welcome screen.
     */
    logout( ) {
      const provider = this.get('session.provider');
      this.get('session').close(provider)
        .then(() => this.transitionTo('welcome'));
    },

    /**
     * accessDenied is an action which is sent from the Torii
     * authentication adapter when a user isn't logged in. In
     * router.js use `this.authenticatedRoute()` in place of
     * `this.route()` to automate this behaviour.
     */
    accessDenied( ) {
      this.transitionTo('welcome');
    }
  }

});
