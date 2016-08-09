import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('super-form/datepicker', 'Integration | Component | super form/datepicker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{super-form/datepicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#super-form/datepicker}}
      template block text
    {{/super-form/datepicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
