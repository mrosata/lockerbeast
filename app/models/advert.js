import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import {getDefaultDate, getDateFromNow} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  category: belongsTo('category'),
  date: attr('number', {
    defaultValue: getDefaultDate
  }),
  endDate: attr('number', {
    defaultValue: getDateFromNow('1 week')
  }),
  published: attr('boolean'),
  member: belongsTo('member', {inverse: 'itemsAdded'}),
  ratings: hasMany('rating', {inverse: null})
});
