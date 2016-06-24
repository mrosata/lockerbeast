import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Em from 'ember';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  username: attr('string'),
  birthday: attr(),
  gender: attr('string', 'unspecified'),
  rank: attr('number'),
  email: attr('string'),

  bio: attr('string', {
    defaultValue: ''
  }),
  photo: attr('string', {
    defaultValue: ''
  }),
  background: attr('string', {
    defaultValue: ''
  }),

  social: belongsTo('member-social'),
  public: attr('boolean', {
    defaultValue: true
  }),

  /**
   * fullName -- computed value
   * "firstName lastName"
   */
  fullName: Em.computed('firstName', 'lastName', function() {
    let firstName = this.get('firstName') || '';
    let lastName = this.get('lastName') || '';
    return `${firstName} ${lastName}`.trim();
  })
});
