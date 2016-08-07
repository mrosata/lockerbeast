import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('super-form/firebase-uploader', 'Integration | Component | super form/firebase uploader', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{super-form/firebase-uploader}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#super-form/firebase-uploader}}
      template block text
    {{/super-form/firebase-uploader}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
