import DS from 'ember-data';
import {hasMany, belongsTo} from 'ember-data/relationships';

export default DS.Model.extend({
  ratings: hasMany('rating'),
  recommendation: belongsTo('recommendation'),
  article: belongsTo('article'),
  review: belongsTo('review'),

  getRatings() {
    return this.get('ratings');
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
