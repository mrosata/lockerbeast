import Em from 'ember';

import {applyToFirstCallableFn, capitalize} from 'lockerbeast/utils/ember-fp';

export default Em.Service.extend({

  store: Em.inject.service(),

  createNew(modelType, hash) {
    let _get = (v) => get(this, v);
    return applyToFirstCallableFn( this, [hash, modelType], _get(`create${capitalize(modelType)}`), _get('createGeneric') );
  },


  createGeneric(modelValues, modelType) {
    let record = this.get('store').createRecord(modelType, modelValues);
    return record.save();
  },


  createReview(modelValues) {
    let review = this.get('store').createRecord('review', modelValues);
    return review.save();
  }
});
