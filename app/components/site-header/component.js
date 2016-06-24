import Em from 'ember';

export default Em.Component.extend({
  session: Em.inject.service(),

  actions: {
    logout() {
      this.sendAction('logout');
    }
  }
});
