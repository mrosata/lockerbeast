import Em from 'ember';
import is from 'lockerbeast/utils/is';
import _ from 'lodash';


const setDefaults = (item) => {
  item.value = item.default || '';
  return item;
};
const applyTransforms = (item) => {
  let transform = is.callable(item.transform) ? item.transform : (c) => c;
  set(item, '_value', transform(get(item,'value')));
  return item;
};

const fieldHasValidationFn = (item) => typeof item.validation === "function";
const checkIfFieldFailsValidation = (field) => !field.validation(field.value);


/**
 *
 * @type {
 *   {
 *     htmlFieldContainerClass: string,
 *     htmlFieldWrapperClass: string,
 *     submitBtnClass: string,
 *     submitBtnText: string,
 *     passThrough: null|object,
 *     formFields: array<object>,
 *     _formFields: (Ember.ComputedProperty|*),
 *     allFinalValues: (Ember.Object) cobination of finished form fields and passthrough values,
 *     submitIsDisabled: (Ember.ComputedProperty|*),
 *     callbackSubmit: (Ember.ComputedProperty|*),
 *     actions: {
 *       onSubmitForm: (function())
 *     }
 *   }
 * }
 */
export default Em.Component.extend({

  htmlFieldContainerClass: 'form-group',
  htmlFieldWrapperClass: 'col-sm-12 col-md-6',
  submitBtnClass: '',
  submitBtnText: 'Submit',

  passThrough: null,
  formFields: [],

  _formFields: Em.computed('formFields.[]', function () {
    return get(this, 'formFields')
      .map(setDefaults);
  }),

  allFinalValues: Em.computed('_formFields', 'passThrough', function () {
    const passThrough = is.object(get(this, 'passThrough')) ? get(this, 'passThrough') : {};
    const finalFormValues = _(get(this, '_formFields'))
      .filter((v) => !!v.attr)
      .map(applyTransforms)
      .mapKeys('attr')
      .mapValues('_value')
      .value();

    return _.merge(finalFormValues, passThrough);
  }),

  submitIsDisabled: Em.computed('_formFields.@each.value', function () {
    return get(this, '_formFields')
      .filter(fieldHasValidationFn)
      .some(checkIfFieldFailsValidation);
  }),


  callbackSubmit: Em.computed('onSubmit', function () {
    return is.callable(get(this, 'onSubmit')) ? get(this, 'onSubmit') : (formValues) => formValues;
  }),

  actions: {
    onSubmitForm() {
      this._super(...arguments);
      get(this, 'callbackSubmit')(this.get('allFinalValues'));
    }
  }
});
