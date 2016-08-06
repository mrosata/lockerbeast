import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  category: attr('string'),
  date: attr('number', {
    defaultValue: function() {
      return moment.utc().unix();
    }
  }),
  member: belongsTo('member', {inverse: 'itemsAdded'}),
  ratings: hasMany('rating', {inverse: null})
});
