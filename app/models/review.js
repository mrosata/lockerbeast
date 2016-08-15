import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  title: attr(),
  member: belongsTo('member'),
  date: attr('number', {
    defaultValue: getDefaultDate
  }),
  category: belongsTo('category', {inverse: null}),
  image: attr(),
  body: attr(),
  ratings: hasMany('rating')
});
