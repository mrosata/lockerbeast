import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  ratings: hasMany('rating'),
  name: attr('string'),
  desc: attr('string'),
  added: attr()
});
