import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  member: belongsTo('member'),
  item: belongsTo('ratable-content'),
  value: attr('number'),
  date: attr('number', {
    defaultValue: getDefaultDate
  })
});
