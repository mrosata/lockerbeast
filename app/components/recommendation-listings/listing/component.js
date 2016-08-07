import Em from 'ember';

export default Em.Component.extend({
  classNames: ['col-md-12', 'section-post-related'],

  item: null,

  itemSummary: Em.computed('item.text', function() {
    let text = this.get('item.text') || '';
    return text.toString().slice(0, 150);
  })
});
