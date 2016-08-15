import Ember from 'ember';

export default Ember.Route.extend({
  redirect () {
    var url = this.router.location.formatURL('/four-oh-four');
    if (window.location.pathname !== url) {
      this.transitionTo('/four-oh-four', 'four-oh-four');
    }
  }
});
