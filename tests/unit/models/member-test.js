import { moduleForModel, test } from 'ember-qunit';
import Em from 'ember';

moduleForModel('member', 'Unit | Model | member', {
  // Specify the other units that are required for this test.
  needs: ['model:member-social']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});


// Test that the member model owns a memberSocial on 'social'
test('should own a memberSocial model', function(assert) {
  const member = this.store().modelFor('member');
  const relationship = Em.get(member, 'relationshipsByName').get('social');
  assert.equal(relationship.key, 'social', 'has relationship with profile');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongs to');
});
