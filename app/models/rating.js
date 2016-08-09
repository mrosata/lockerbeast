import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

const defaultValueNull = {defaultValue: null};

export default Model.extend({
  member: belongsTo('member', {inverse: 'ratings'}),
  recommendation: belongsTo('recommendation', defaultValueNull),
  review: belongsTo('review', defaultValueNull),
  article: belongsTo('article', defaultValueNull),
  item: belongsTo('item', defaultValueNull),
  value: attr(),
  date: attr('number', {
    defaultValue: getDefaultDate
  })
});
