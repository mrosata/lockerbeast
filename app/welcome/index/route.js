import Em from 'ember';

export default Em.Route.extend({
  auth: Em.inject.service(),

  actions: {
    onSubmitForm(newUser) {
      alert(`Signup for ${newUser.username}`);
    }
  }
});
