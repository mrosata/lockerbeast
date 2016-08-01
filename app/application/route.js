import Em from 'ember';

export default Em.Route.extend({

  actions: {
    /**
     * Revoke user auth and then return them to welcome screen.
     */
    logout( ) {
      const provider = this.get('session.provider');
      this.get('session').close(provider).then(() => this.transitionTo('welcome'));
    },

    /**
     * accessDenied is an action which is sent from the Torii
     * authentication adapter when a user isn't logged in. In
     * router.js use `this.authenticatedRoute()` in place of
     * `this.route()` to automate this behaviour.
     */
    accessDenied( ) {
      this.transitionTo('welcome');
    },


    /**
     * Generic model creation to make items and articles from the
     * form which sends back onSubmitCreate action. Perhaps this
     * should move into the forms component.
     * @param modelType
     * @param modelProperties
     */
    onSubmitCreate( modelType, modelProperties) {
      this.get('auth.user').then(user => {

        let model = {
          body: modelProperties.get('body'),
          category: modelProperties.get('category'),
          title: modelProperties.get('title'),
          added: moment().unix(),
          member: user
        };
        this.get('store').createRecord(modelType, model).save().then(record => {

          record.set('user', user);
          user.get('itemsAdded').pushObject(record);
          record.save();
          user.save();
        });
      });

    }
  }


});
