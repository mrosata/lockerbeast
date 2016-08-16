import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';
import RatableMixin from 'lockerbeast/mixins/ratable';

export default Model.extend(RatableMixin, {
  title: attr('string'),
  body: attr('string'),
  category: attr('string'),
  comments: hasMany('comment'),
  date: attr('number', {
    defaultValue: getDefaultDate
  }),
  member: belongsTo('member', {inverse: 'itemsAdded'}),
  ratings: hasMany('rating', {inverse: null}),
});
