import JUI from 'lockerbeast/components/jquery-ui/component';

export default JUI.extend({
  classList: [''],
  uiType: 'datepicker',
  uiOptions: ['disabled', 'altField', 'altFormat', 'appendText', 'autoSize', 'buttonImage', 'buttonImageOnly', 'buttonText', 'calculateWeek', 'changeMonth', 'changeYear', 'closeText', 'constrainInput', 'currentText', 'dateFormat', 'dayNames', 'dayNamesMin', 'dayNamesShort', 'defaultDate', 'duration', 'firstDay', 'gotoCurrent', 'hideIfNoPrevNext', 'isRTL', 'maxDate', 'minDate', 'monthNames', 'monthNamesShort', 'navigationAsDateFormat', 'nextText', 'numberOfMonths', 'prevText', 'selectOtherMonths', 'shortYearCutoff', 'showAnim', 'showButtonPanel', 'showCurrentAtPos', 'showMonthAfterYear', 'showOn', 'showOptions', 'showOtherMonths', 'showWeek', 'stepMonths', 'weekHeader', 'yearRange', 'yearSuffix'],
  uiEvents: ['create', 'beforeShow', 'beforeShowDay', 'onChangeMonthYear', 'onClose', 'onSelect'],

  tagName: 'input',
  // Make sure that value maps to date so we can get the value from the controller
  attributeBindings: ['value:date', 'placeholder', 'type', 'id', 'readonly'],
  type: 'text',
  date: '',
  readonly: true,

  onSelect(textDate) {
    this._setDate( textDate );
  },

  change() {
    this._setDate( this.$.val() );
  },

  /**
   * Need to set both value and date.
   *
   * @param textDate
   */
  _setDate( textDate ) {
    this.set('value', textDate );
    this.set('date', textDate );
  }
});
