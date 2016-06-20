import {test} from 'qunit';
import moduleForAcceptance from 'lockerbeast/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sign up for new account');

// These are all the selectors for the signup form
const selectors = {
  form: 'form[name="create-account"]',
  email: 'input[name="email"]',
  firstName: 'input[name="first-name"]',
  lastName: 'input[name="last-name"]',
  birthday: 'input[name="birthday"]',
  username: 'input[name="username"]',
  password: 'input[name="password"]',
  confirmPassword: 'input[name="confirm-password"]',
  gender: 'input[name="gender"]'
};


test('Should be able to sign up for a new account using form on welcome page.', function (assert) {
  visit('/welcome');

  andThen(function () {
    // Make sure we are at the correct page.
    assert.equal(currentURL(), '/welcome', 'The current URL should be "/welcome"');

    // Test that all fields are present on the form.
    andThen(function () {
      const $form = findWithAssert(selectors.form);
      findWithAssert(selectors.email, $form);
      findWithAssert(selectors.firstName, $form);
      findWithAssert(selectors.lastName, $form);
      findWithAssert(selectors.birthday, $form);
      findWithAssert(selectors.username, $form);
      findWithAssert(selectors.password, $form);
      findWithAssert(selectors.confirmPassword, $form);
      findWithAssert(selectors.gender, $form);

      // custom helper
      shouldHaveElementWithCount(assert, selectors.gender, 3, $form);

      // Fill in the form
      fillIn(selectors.email, 'mike@mcool.com');
      fillIn(selectors.username, 'mikemcool');
      fillIn(selectors.firstName, 'Mike');
      fillIn(selectors.lastName, 'Mcool');
      fillIn(selectors.birthday, '1990/12/12');
      fillIn(selectors.password, 'pass');
      fillIn(selectors.confirmPassword, 'pass');
      click(`${selectors.gender}[value='male']`);
    });

    // There should be no inputs with empty values.
    andThen(function () {
      assert.equal(find(`${selectors.form} input[value=""]`).length, 0, 'All fields on form should be filled in.');
    });

  });

});

