import Em from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

const { A, Logger } = Em;
const FB_ROOT = config.firebase;

export default Em.Route.extend({

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('logout');
    }
  },

  _createUser() {

  },

  actions: {
    login () {
      var controller = this.controllerFor('welcome.index');
      var email = controller.get('userEmail');
      var password = controller.get('userPass');

      controller.set( 'userPass', null );

      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(() => {
        this.transitionTo('home');
      });
    },


    signUpUser (newUser) {
      /*this.checkUserForm();
       this.createNewUser();
       this.createUserProfile();
       */
      const controller = this.controllerFor('welcome.signup');
      const fire = new Firebase(FB_ROOT),
            self = this;

      let newUserCredentials = {
        email: newUser.email,
        password: newUser.password
      };

      /* Create a new user */
      fire.createUser( newUserCredentials,
        (error, userData) => {
          if (error) {
            // Handle User Creation Error
            alert(error.message);
            return void 0;
          }
          // Get the current Em Firebase session ( Torii )
          return this.get('session').open('firebase', {
            provider: 'password',
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
          })
            .then(( ) => {
              // Create and Save a userProfile

              let userRecord = this.store.createRecord('user', {
                id: userData.uid,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                birthday: moment(newUser.birthday, 'YYYY/MM/DD').utc().toISOString(),
                username: newUser.username,
                country: newUser.country,
                gender: newUser.gender,
                email: newUser.email,
                rank: 'member',
                public: 'true',
                bio: ''
              });

              userRecord.save().then(savedUser => {
                // Send the user to the home page!
                if (savedUser === null) {
                  throw new Error('User Creation Failed!');
                }

                let memberSocial = this.store.createRecord('member-social', {
                  user: savedUser
                });

                memberSocial.save().then(userNetwork => {
                  // Now create the main user profile
                  savedUser.set('memberSocial', userNetwork);
                  savedUser.save().then((/*savedUser*/) => {
                    self.transitionTo('home');
                  });
                });
              });
            })
            .catch( (error) => {
              // Catch errors propagated from within promise chain.
              Logger.error("Error in Promise Chain User/UserProfile Creation", error);
              // Handle User Creation Error
              for (const err of error.errors) {
                alert(err.message);
              }
              return void 0;
            });


        });

    }
  }
});
