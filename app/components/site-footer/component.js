import Ember from 'ember';

export default Ember.Component.extend({
  // Only show the bottom bar? (leaves out all the links and news)
  minimal: null,

  tagName: 'footer'
});
