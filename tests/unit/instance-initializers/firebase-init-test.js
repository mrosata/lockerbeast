import Ember from 'ember';
import { initialize } from 'lockerbeast/instance-initializers/firebase-init';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';


module('Unit | Instance Initializer | firebase init', {
  beforeEach: function() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('Firebase is available in initializer', function(assert) {
  assert.expect(1);
  // you would normally confirm the results of the initializer here
  assert.equal(typeof firebase === "object" && typeof firebase.SDK_VERSION === "string", true, 'Firebase is loaded');
});



test('it should run before Firebase is initialized', function(assert) {
  assert.expect(1);
  // you would normally confirm the results of the initializer here
  assert.throws(() => {
    return firebase.auth();
  }, 'Firebase App should throw error when attempting to use `auth` before initialization');
});


test('it should initialize firebase', function (assert) {
  initialize(this.appInstance);
  assert.expect(1);
  assert.ok(firebase.auth(), 'It should have firebase initialized properly');
});




