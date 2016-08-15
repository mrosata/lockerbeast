import Em from 'ember';
import _ from 'lodash';

export default Em.Route.extend({

  actions: {

    /**
     * Sign up User
     * @param newUser
     */
    onSubmitForm (newUser) {
      const authService = this.get('auth');
      const bound = {
        login: _.bind(authService.login, authService, newUser.get('email'), newUser.get('password')),
        createUserProfile: _.bind(authService.createUserProfile, authService, newUser)
      };

      authService
        .signUpUser(newUser)
        .then( bound.login )
        .then( bound.createUserProfile )
        .then(() => this.transitionTo('home'))
        .catch(error => {
          Em.Logger.error("Error in Promise Chain User/UserProfile Creation", error);
          alert(error.message || error.code);
          return void(0);
        });
    },


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
