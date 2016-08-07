import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { belongsTo, hasMany } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  title: attr(),
  member: belongsTo('member'),
  body: attr(),
  ratings: hasMany('rating'),
  review: belongsTo('review'),
  recommendation: belongsTo('recommendation'),
  article: belongsTo('article'),
  date: attr('number', {
    defaultValue: getDefaultDate
  })
});
