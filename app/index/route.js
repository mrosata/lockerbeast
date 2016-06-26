import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Check if the user is logged in.
   * @return {[type]}  [description]
   */
  beforeModel(){
    if ( !this.get( 'session.isAuthenticated' )) {
      this.transitionTo('welcome');
    }
    else {
      this.transitionTo('home');
    }
  }

});
