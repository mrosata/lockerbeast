import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);

    const $search = this.$('#search'),
          $btnSearch = this.$('#btn-search');
    
    $btnSearch
      .on('click', function(e) {
        e.preventDefault();
        $search.animate({width: 'toggle'}).focus();
      });
  }
});
