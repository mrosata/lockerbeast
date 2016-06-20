import { moduleFor, moduleForModel, test } from 'ember-qunit';
import Em from 'ember';

moduleForModel('member', 'Unit | Model | member', {
  // Specify the other units that are required for this test.
  needs: ['model:member-social']
});

// This is required for testing computed properties on the model
moduleFor('model:member', 'Unit | member', {
  unit: true
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


// Test that the CP fullName works as expected.
test('Should correctly concat fullName property', function (assert) {
  let model = this.subject();
  assert.equal(model.get('fullName'), '', 'fullName should be "" when first and last names are ""');
  model.set('firstName', 'Mike');
  model.set('lastName', 'McPancakester');

  assert.equal(model.get('fullName'), 'Mike McPancakester', 'fullName should update after changes to {first,last}Name');
});

