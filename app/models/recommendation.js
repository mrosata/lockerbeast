import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  title: attr(),
  member: belongsTo('member'),
  category: attr('string'),
  comments: hasMany('comment'),
  body: attr(),
  url: attr('string'),
  image: attr(),
  ratings: hasMany('rating'),
  date: attr('number', {
    defaultValue: getDefaultDate
  })
});
