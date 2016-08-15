import Em from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  // This is the way to link to the ratings (EmberFire doesn't support polymorphism)
  ratableContent: belongsTo('ratable-content'),

  title: attr(),
  member: belongsTo('member'),
  category: belongsTo('category', {inverse: null}),
  comments: hasMany('comment'),
  body: attr('string'),
  url: attr('string'),
  image: attr('string'),
  tags: hasMany('tag', {inverse: 'recommendations'}),
  date: attr('number', {
    defaultValue: getDefaultDate
  }),

  currentRating: Em.computed('title', function () {
    return Math.ceil(Math.random() * 5);
  }),

  getAllRatings() {
    this.getRatingsContainer()
      .then(ratingsContainer => {
        return ratingsContainer.getRatings();
      });
  },

  getRatingsContainer() {
    return this.get('ratableContent')
      .then((ratableContent) => {
        if (!ratableContent) {
          ratableContent = this.store.createRecord('ratable-content', {
            recommendation: this
          });
          return ratableContent.save();
        }
        return ratableContent;
      });
  },

  getAverageRating() {
    return this.getRatingsContainer()
      .then(ratingsContainer => ratingsContainer.getAverageRating());
  }

});
