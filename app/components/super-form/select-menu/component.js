import Ember from 'ember';

export default Ember.Component.extend({
  content: [],
  prompt: null,
  optionValuePath: 'value',
  optionLabelPath: 'text',

  tagName: 'select',

  change() {

    let selectedIndex = this.$(this.element)[0].selectedIndex;
    let content = this.get('content');

    // decrement index by 1 if we have a prompt
    let hasPrompt = !!this.get('prompt');
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
