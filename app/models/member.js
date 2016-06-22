import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Em from 'ember';

export default Model.extend({
  firstName: attr(),
  lastName: attr(),
  username: attr(),
  birthday: attr(),
  gender: attr('string', 'unspecified'),
  rank: attr('number'),
  email: attr(),
  bio: attr(),
  photo: attr(),
  background: attr(),

  social: belongsTo('member-social'),

  public: attr('boolean'),

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
