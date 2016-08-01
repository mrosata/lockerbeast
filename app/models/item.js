import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  category: attr('string'),
  added: attr(),
  member: belongsTo('member', {inverse: 'itemsAdded'}),
  ratings: hasMany('rating', {inverse: null})
});
