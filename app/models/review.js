import Em from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';
import RatableMixin from 'lockerbeast/mixins/ratable';

export default Model.extend(RatableMixin, {
  // This is the way to link to the ratings (EmberFire doesn't support polymorphism)
  ratableContent: belongsTo('ratable-content'),

  title: attr(),
  member: belongsTo('member'),
  category: belongsTo('category', {inverse: null}),
  comments: hasMany('comment'),
  body: attr('string'),
  image: attr('string'),
  tags: hasMany('tag', {inverse: 'recommendations'}),
  date: attr('number', {
    defaultValue: getDefaultDate
  }),

  item: belongsTo('item')
});
