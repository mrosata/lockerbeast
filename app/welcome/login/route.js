import Em from 'ember';

export default Em.Route.extend({
  
  actions: {

    /**
     * Send user credentials to login() auth service and
     * then transition to home route.
     *
     * @param userCredentials
     */
    onLoginSubmit(userCredentials) {
      this.get('auth')
        .login(userCredentials.get('username'), userCredentials.get('password'))
        .then(() => this.transitionTo('home')).catch(err => Em.Logger.error(err.message));
    }
  }

});
