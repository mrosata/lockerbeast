import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jquery-ui/datepicker', 'Integration | Component | jquery ui/datepicker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jquery-ui/datepicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jquery-ui/datepicker}}
      template block text
    {{/jquery-ui/datepicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
