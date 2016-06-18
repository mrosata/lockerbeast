import { test } from 'qunit';
import moduleForAcceptance from 'lockerbeast/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | welcome');

test('visiting /welcome', function(assert) {
  visit('/welcome');

  andThen(function() {
    assert.equal(currentURL(), '/welcome');
  });
});
