import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Em from 'ember';

moduleForComponent('welcome/login-form', 'Integration | Component | welcome/login form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(1);
  this.render(hbs`{{welcome/login-form}}`);

  assert.notEqual(this.$().text().trim(), '');
});


test('it triggers the onSubmitForm action upon submission', function(assert) {

  assert.expect(3);

  let expected = {
    username: 'mikemcool',
    password: 'pass123'
  };

  this.set('actions', Em.Object.create());
  this.set('onLoginSubmit', (actual = {}) => {
    let actualParsed = {
      username: actual.get('username'),
      password: actual.get('password')
    };

    assert.deepEqual(actualParsed, expected, 'Passes correct data to onLoginSubmit handlers');
  });


  this.set('formValues', Em.Object.create());

  this.render(hbs`{{welcome/login-form onLoginSubmit=onLoginSubmit formValues=formValues}}`);

  assert.equal(this.$('button[type=submit]').attr('disabled'), 'disabled', 'Form should not be ready before filled out');

  // Fill out the login form
  this.set('formValues.username', expected.username);
  this.set('formValues.password', expected.password);

  assert.equal(this.$('button[type=submit]').attr('disabled'), undefined, 'Form should be ready when all fields filled out');

  this.$('button[type=submit]').click();

});
