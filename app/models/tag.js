import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  reviews: hasMany('review'),
  recommendations: hasMany('recommendation'),
  article: hasMany('article'),
  advert: hasMany('advert'),
  item: hasMany('item'),
  count: attr('number', {
    defaultValue: 0
  })
});
