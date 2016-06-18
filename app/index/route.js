import Em from 'ember';

export default Em.Route.extend({

  beforeModel(){

    if ( !this.get( 'session.isAuthenticated' )) {
      this.transitionTo('welcome');
    }
    else {
      this.transitionTo('home');
    }
  }

});
