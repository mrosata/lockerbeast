import Ember from 'ember';
import RatableMixin from 'lockerbeast/mixins/ratable';
import { module, test } from 'qunit';

module('Unit | Mixin | ratable');

// Replace this with your real tests.
test('it works', function(assert) {
  let RatableObject = Ember.Object.extend(RatableMixin);
  let subject = RatableObject.create();
  assert.ok(subject);
});
