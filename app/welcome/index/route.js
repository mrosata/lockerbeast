import Em from 'ember';

export default Em.Route.extend({
  auth: Em.inject.service(),

  actions: {

    /**
     * Sign up User
     * @param newUser
     */
    onSubmitForm (newUser) {
      const authService = this.get('auth');
      authService
        .signUpUser(newUser)
        .then(() => authService.login(newUser.get('email'), newUser.get('password')))
        .then(() => authService.createUserProfile(newUser))
        .catch(error => {
          // Catch errors propigated from within promise chain.
          Em.Logger.error("Error in Promise Chain User/UserProfile Creation", error);
          
          // Handle User Creation Error
          for (const err of error.errors) {
            alert(err.message);
          }
          return void 0;
        });
    }

  }
});
