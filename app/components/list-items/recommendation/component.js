import Em from 'ember';

export default Em.Component.extend({
  classNames: ['col-md-12', 'section-post-related'],

  item: null,
  maxLength: null,

  itemSummary: Em.computed('item.body', function() {
    let text = `${(this.get('item.body') || '')}`,
      maxLength = +get(this, 'maxLength');
    return `${text.toString().slice(0, 150)} ${text.length > maxLength ? '... ' : ''}`;
  })
});
