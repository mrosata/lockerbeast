import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  category: belongsTo('category'),
  comments: hasMany('comment'),
  image: attr('array'),
  created: attr('number', {
    defaultValue: getDefaultDate
  }),
  member: belongsTo('member'),
  ratings: hasMany('rating', {inverse: null})
});
