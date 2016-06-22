import Em from 'ember';
import Firebase from 'firebase';
import config from 'lockerbeast/config/environment';

export default Em.Service.extend({

  signUpUser(newUser){
    let conn = Firebase(config.firebase);

    debugger;
    conn.createUser( newUser,
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

            let userRecord = this.store.createRecord('member', {
              id: userData.uid,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              birthday: moment(newUser.birthday, 'YYYY-MM-DD').utc().toISOString(),
              username: newUser.username,
              country: newUser.country,
              gender: newUser.gender,
              email: newUser.email
            });

            userRecord.save().then(savedUser => {
              // Send the user to the home page!
              if (savedUser === null) {
                throw new Error('User Creation Failed!');
              }
              alert('good to go!');
            });
          })
          .catch( (error) => {
            // Catch errors propigated from within promise chain.
            Em.Logger.error("Error in Promise Chain User/UserProfile Creation", error);
            // Handle User Creation Error
            for (const err of error.errors) {
              alert(err.message);
            }
            return void 0;
          });


      });

  }
});
