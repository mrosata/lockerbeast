import Em from 'ember';

export default Em.Route.extend({

  /**
   * Check if the user is logged in.
   * @return {[type]}  [description]
   */
  beforeModel( ) {
    this.checkLogin()
      .catch((/*err*/) => {
        /* We are not logged in (there is no session) */
        this.transitionTo('welcome.index');
      });
  },


  checkLogin( ) {
    return this.get('session').fetch();
  },

  actions: {
    logout( ) {
      this.get('session').close().then(function() {
        this.accessDenied();
      });
    },

    accessDenied( ) {
      this.transitionTo('welcome');
    }
  }

});
