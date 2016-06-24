import Em from 'ember';

export default Em.Route.extend({

  /**
   * Check if the user is logged in.
   * @return {[type]}  [description]
   */
  beforeModel( ) {
    this.get('session').fetch('firebase')
      .catch(() => this.transitionTo('welcome'))
      .then(() => this.transitionTo('application'));
  },

  accessDenied( ) {
    this.transitionTo('welcome');
  },

  actions: {
    logout( ) {
      this.get('session').close().then(() => {
        this.accessDenied();
      });
    }
  }

});
