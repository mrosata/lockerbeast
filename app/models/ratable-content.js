import Em from 'ember';
import DS from 'ember-data';
import {hasMany, belongsTo} from 'ember-data/relationships';

export default DS.Model.extend({
  ratings: hasMany('rating'),
  recommendation: belongsTo('recommendation'),
  article: belongsTo('article'),
  review: belongsTo('review'),

  getRatings() {
    return Em.RSVP.resolve(get(this, 'ratings'));
  },

  getRatingsArray() {
    return this.get('ratings')
      .then(ratings => {
        Em.Logger.log(`ratings in Model`, ratings);
        Em.Logger.log(`get(ratings, 'length')`, get(ratings, 'length'));
        Em.Logger.log(`ratings.get('length')`, ratings.get('length'));
        Em.Logger.log(`ratings.length`, ratings.length);
        return (get(ratings, 'length')) ? ratings.toArray() : [];
      });
  },

  getAverageRating() {
    return this.getRatings()
      .then(ratings => {
        let aggregation = ratings.toArray().reduce((updated, item) => {
          updated.n++;
          updated.t += +get(item, 'value');
          return updated;
        }, {n: 0,t: 0});
        return aggregation.n > 0 ? (+aggregation.t / +aggregation.n) : 0;
      });
  }
});
