import Ember from 'ember';

export default Ember.Test.registerHelper('shouldHaveElementWithCount', function(app, assert, selector, n, context) {
  const $el = findWithAssert(selector, context);
  const count = $el.length;
  assert.equal(n, count, `Found a count of ${count} element/s`);
});

// shouldHaveElementWithCount(assert, 'li.result', 20);
// shouldHaveElementWithCount(assert, 'input[type=radio]', 3, $form);
