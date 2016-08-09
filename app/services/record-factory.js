import Em from 'ember';
import is from 'lockerbeast/utils/is';
import _ from 'lodash';
import {applyToFirstCallableFn, capitalize, findOrCreate, queryRecordBy, pushHasManyToModel, setItemToModel} from 'lockerbeast/utils/ember-fp';

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
    return applyToFirstCallableFn(this,
      [hash, modelType],
      _get(`create${capitalize(modelType)}`),
      _get('createGeneric'));
  },


  createGeneric(modelValues, modelType) {
    let record = get(this, 'store').createRecord(modelType, modelValues);
    return record.save();
  },


  createReview(modelValues) {
    let member = modelValues.member;
    if (!member) {
      return Em.RSVP.reject(new Error("Reviews must have a member property!"));
    }

    let review = get(this, 'store')
      .createRecord('review', modelValues);

    return review.save().then(attachMemberToModel(member));
  },


  createRecommendation(modelValues) {
    const store = get(this, 'store');
    let categoryId = modelValues.category || null;
    let member = modelValues.member;
    let tags = modelValues.tags || [];
    delete modelValues.category;
    delete modelValues.tags;

    if (!member) {
      return Em.RSVP.reject(new Error("Recommendations must have a member property!"));
    }

    let recommendation = store
      .createRecord('recommendation', modelValues);

    const recSave = recommendation.save();

    return recSave.then((record) => {
      attachMemberToModel(member);
      const attachToModel = pushHasManyToModel(record, 'tags');
      const attachModelToSelf = _.partial(pushHasManyToModel, _, 'recommendations', record);
      this.rsvpFindOrCreateArrayOfTags(tags)
        .then(tagModels => {
          tagModels.map(attachToModel);
          tagModels.map(attachModelToSelf);
        });
      this.findCategoryById(categoryId)
        .then(setItemToModel(record, 'category'));
      return record.save();
    });
  },


  rsvpFindOrCreateArrayOfTags (tags) {
    const store = get(this, 'store');
    return Em.RSVP.Promise.all(
      tags
        .map((tagName) => Object({id: Em.String.dasherize(tagName), name: tagName}))
        .map((tagObject) => findOrCreate(store, 'tag', tagObject.id, tagObject))
    );
  },


  findCategoryById(categoryId) {
    return get(this, 'store')
      .find('category', categoryId).catch(() => null);
  }

});
