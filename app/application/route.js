import Em from 'ember';

export default Em.Route.extend({

  actions: {
    logout( ) {
      this.get('session').close().then(() => this.transitionTo('welcome'));
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
