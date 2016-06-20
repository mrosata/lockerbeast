import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aside-feed', 'Integration | Component | aside feed', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(0);
  this.render(hbs`{{aside-feed}}`);

  //assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#aside-feed}}
      template block text
    {{/aside-feed}}
  `);

  //assert.equal(this.$().text().trim(), 'template block text');
});
