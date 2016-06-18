import { moduleFor, test, equal } from 'ember-qunit';

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('hello world', function (assert) {
  equal(1, 2, 'not equal kwappa!');
});
