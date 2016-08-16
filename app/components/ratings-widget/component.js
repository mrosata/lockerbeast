import Em from 'ember';
import {findFromStore} from 'lockerbeast/utils/ember-fp';

export default Em.Component.extend({
  auth: Em.inject.service(),
  store: Em.inject.service(),
  recordFactory: Em.inject.service(),
  session: Em.inject.service(),

  rating: 3,
  memberRating: null,
  model: null,

  newRatingValue: null,

  member: Em.computed('session.uid', function() {
    return get(this, 'store').find('member', get(this, 'session.uid'));
  }),

  memberCanVote: Em.computed.bool('session.isAuthenticated'),

  didReceiveAttrs() {
    let item = get(this, 'model');

    if (item) {
      this.updateAverageRating();
    }

  },


  updateAverageRating() {
    get(this, 'model').getAverageRating()
      .then(averageRating => set(this, 'averageRating', averageRating));

  },


  /**
   * Create or Update 'rating' record related to
   * this item and this member.
   */
  addNewRating(ratingValue) {
    const model = get(this, 'model');

    return get(this, 'member')
      .then((member) => {

        model.getRatingsContainer()
          .then(ratingsContainer => {

            ratingsContainer.getRatingsArray()
              .then(ratings => {
                // Get the rating made by member
                return ratings.find(rating => {
                  return get(rating, 'member.id') === get(member, 'id');
                });
              })
              .then(rating => {
                if (rating) {
                  // just need to update values since rating exists.
                  rating.set('value', ratingValue);
                  rating.set('date', moment.utc().unix());
                  return rating.save();
                }
                else {
                  return get(this, 'recordFactory').createRating({
                    item: ratingsContainer,
                    value: ratingValue,
                    member: member
                  })
                    .then(rating => {
                      // This rating is new so it needs to be put into container
                    get(ratingsContainer, 'ratings').pushObject(rating);
                    get(member, 'ratings').pushObject(rating);
                    set(rating, 'member', member);

                    ratingsContainer.save();
                    member.save();
                    rating.save();
                  });
                }
              });
          });
      });

  },


  actions: {

    addNewRating(ratingValue) {
      Em.Logger.log(`this`, this);
      Em.Logger.log(`this.updateAverageRating`, this.updateAverageRating);
      return this.addNewRating(ratingValue)
        .then((/*rating*/) => this.updateAverageRating());
    },

    setNewRatingValue(val) {
      set(this, 'memberRating', val);
      this.addNewRating();
    }
  }

});
