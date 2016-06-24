import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Em from 'ember';


moduleForComponent('welcome/signup-form', 'Integration | Component | welcome/signup form', {
  integration: true,
  beforeEach() {

  },
  afterEach() {

  }
});


test('it renders the title properly', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{welcome/signup-form}}`);
  assert.notEqual(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#welcome/signup-form title='Test title wakka wakka'}}
      ------------------------><---------------------
    {{/welcome/signup-form}}
  `);

  assert.equal(this.$('.headline-row .title').text().trim(), 'Test title wakka wakka');
});



test('it triggers the onSubmitForm action upon submission', function(assert) {

  assert.expect(3);

  let expected = {
    email: 'mike@mcool.com',
    username: 'mikemcool',
    firstName: 'Mike',
    lastName: 'Mcool',
    birthday: '1990-12-12',
    password: 'pass123',
    gender: 'male'
  };

  this.set('actions', Em.Object.create());
  this.set('onSubmitForm', (actual = {}) => {
    let actualParsed = {
      email: actual.get('email'),
      username: actual.get('username'),
      firstName: actual.get('firstName'),
      lastName: actual.get('lastName'),
      birthday: actual.get('birthday'),
      password: actual.get('createPassword'),
      gender: actual.get('gender')
    };

    assert.deepEqual(actualParsed, expected, 'Passes correct data to onFormSubmit handlers');
  });


  this.set('formValues', Em.Object.create());

  this.render(hbs`{{welcome/signup-form onSubmitForm=onSubmitForm formValues=formValues}}`);

  assert.equal(this.$('button[type=submit]').attr('disabled'), 'disabled', 'Form should not be ready before filled out');

  // Fill out the form
  this.set('formValues.email', expected.email);
  this.set('formValues.username', expected.username);
  this.set('formValues.firstName', expected.firstName);
  this.set('formValues.lastName', expected.lastName);
  this.set('formValues.birthday', expected.birthday);
  this.set('formValues.createPassword', expected.password);
  this.set('formValues.confirmPassword', expected.password);
  this.set('formValues.gender', expected.gender);

  assert.equal(this.$('button[type=submit]').attr('disabled'), undefined, 'Form should be ready with all fields filled out correctly');

  this.$('button[type=submit]').click();

});
