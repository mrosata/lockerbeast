import Ember from 'ember';
import is from 'lockerbeast/utils/is';

export default Ember.Component.extend({
  content: [],
  prompt: null,
  optionValuePath: 'value',
  optionLabelPath: 'text',

  tagName: 'select',

  didReceiveAttrs() {
    this._super(...arguments);
    if (!get(this, 'content') && is.thenable(get(this, 'contentPromise'))) {
      get(this, 'contentPromise').then(val => set(this, 'content', val));
    }
  },

  change() {

    let selectedIndex = this.$(this.element)[0].selectedIndex;
    let content = get(this, 'content');

    // decrement index by 1 if we have a prompt
    let hasPrompt = !!get(this, 'prompt');
    let contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;
    let _selection = content[contentIndex];

    this.sendAction('willChangeAction', _selection);

    if (this.get('optionValuePath')) {
      this.set('selection', _selection[this.get('optionValuePath')]);
    } else {
      this.set('selection', _selection);
    }

    this.sendAction('didChangeAction', _selection);
  }
});
