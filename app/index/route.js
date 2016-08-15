import Em from 'ember';

export default Em.Route.extend({

  /**
   * Check if the user is logged in.
   * @return {[type]}  [description]
   */
  beforeModel(){
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('welcome');
    }
    else {
      this.transitionTo('home');
    }
  },

  actions: {
    error: function (error) {
      Em.Logger.error(error);
      this.transitionTo('/not-found');
    }
  }

});
