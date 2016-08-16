import Em from 'ember';
import _ from 'lodash';
import {
  applyToFirstCallableFn,
  capitalize,
  findOrCreate,
  pushHasManyToModel,
  saveModelKeyAs
} from 'lockerbeast/utils/ember-fp';

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
    const store = get(this, 'store');
    let categoryId = modelValues.category || null;
    let member = modelValues.member;
    let tags = modelValues.tags || [];

    if (!member) {
      return Em.RSVP.reject(
        new Error("Reviews must have a member property!"));
    }

    let review = store
      .createRecord('review', {
        title: modelValues.title,
        body: modelValues.body,
        date: modelValues.date,
        image: modelValues.image
      });

    return this.saveRecordAttachTagsAndLinkCategory(review, member, categoryId, tags);
  },


  createRecommendation(modelValues) {
    const store = get(this, 'store');
    let categoryId = modelValues.category || null;
    let member = modelValues.member;
    let tags = modelValues.tags || [];

    if (!member) {
      return Em.RSVP.reject(new Error("Recommendations must have a member property!"));
    }

    let recommendation = store
      .createRecord('recommendation', {
        title: modelValues.title,
        body: modelValues.body,
        url: modelValues.url,
        date: modelValues.date,
        image: modelValues.image
      });

    return this.saveRecordAttachTagsAndLinkCategory(recommendation, member, categoryId, tags);
  },


  /**
   * Work for attaching member to record, record to member, category and tags as
   * well. This method does all the work including finding the category and
   * creating/finding any tags in the DB.
   *
   * @param recordToStore
   * @param member
   * @param categoryId
   * @param tags
   * @returns {Promise}
   */
  saveRecordAttachTagsAndLinkCategory(recordToStore, member, categoryId, tags) {
    const recSave = recordToStore.save();

    return recSave.then((record) => {
      const attachToModel = pushHasManyToModel(record, 'tags');
      const attachModelToSelf = _.partial(pushHasManyToModel, _, 'recommendations', record);

      let tagsWork = this.rsvpFindOrCreateArrayOfTags(tags)
        .then(tagModels => {
          tagModels.map(attachToModel);
          tagModels.map(attachModelToSelf);
        });
      let catWork = this.findCategoryById(categoryId)
        .then(saveModelKeyAs(record, 'category'));

      return Em.RSVP.allSettled([tagsWork, catWork])
        .then(() => attachMemberToModel(member)(record));
    });
  },


  /**
   * Create an array of tag records
   * All tags are created if not found in search
   * @param tags
   * @returns {Promise|{}|Array}
   */
  rsvpFindOrCreateArrayOfTags (tags) {
    const store = get(this, 'store');
    return Em.RSVP.Promise.all(
      [].concat(tags)
        .map((tagName) => Object({id: Em.String.dasherize(tagName), name: tagName}))
        .map((tagObject) => findOrCreate(store, 'tag', tagObject.id, tagObject))
    );
  },


  /**
   * Look up a category by ID
   * @param categoryId
   * @returns {*|Promise|{}|Object|T}
   */
  findCategoryById(categoryId) {
    return get(this, 'store')
      .find('category', categoryId);
  }

});
