import Em from 'ember';

import {applyToFirstCallableFn, capitalize} from 'lockerbeast/utils/ember-fp';

// This bit of code figures out relationship key on member to a record and attaches relationship
const inflector = new Em.Inflector(Em.Inflector.defaultRules);
const attachMemberToModel = (member) => (record) => {
  let recordRelationshipKey = inflector.pluralize(String(record.constructor.modelName).toLowerCase());
  return new Em.RSVP.Promise((resolve/*, reject*/) => {
    Em.RSVP.resolve(member)
      .then(member => {
        member.get(recordRelationshipKey)
          .pushObject(record);
        member.save();
        resolve(record);
      });
  });
};

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
    let member = modelValues.member;
    if (!member) {
      return Em.RSVP.reject(new Error("Reviews must have a member property!"));
    }

    let review = this.get('store')
      .createRecord('review', modelValues);

    return review.save().then(attachMemberToModel(member));
  },


  createRecommendation(modelValues) {
    let member = modelValues.member;

    if (!member) {
      return Em.RSVP.reject(new Error("Recommendations must have a member property!"));
    }

    let recommendation = this.get('store')
      .createRecord('recommendation', modelValues);

    return recommendation.save()
      .then(attachMemberToModel(member));
  }
});
