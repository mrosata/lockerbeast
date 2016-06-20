import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('carousel-slider', 'Integration | Component | carousel slider', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(0);
  this.render(hbs`{{carousel-slider}}`);

//  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#carousel-slider}}
      template block text
    {{/carousel-slider}}
  `);

  //assert.equal(this.$().text().trim(), 'template block text');
});
