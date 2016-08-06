import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  member: belongsTo('member'),
  date: attr('number', {
    defaultValue: function() {
      return moment.utc().unix();
    }
  }),
  body: attr(),
  ratings: hasMany('rating')
});
