import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('recommendation-listings', 'Integration | Component | recommendation listings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{recommendation-listings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#recommendation-listings}}
      template block text
    {{/recommendation-listings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
