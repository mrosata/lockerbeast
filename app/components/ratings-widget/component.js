import Em from 'ember';
import {findFromStore} from 'lockerbeast/utils/ember-fp';

export default Em.Component.extend({
  auth: Em.inject.service(),
  store: Em.inject.service(),
  session: Em.inject.service(),

  rating: null,
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
      item.getAverageRating()
        .then(averageRating => set('rating', averageRating));
    }

  },

  /**
   * Create new 'rating' record.
   * link to current model and current user.
   */
  addNewRating() {
    const model = get(this, 'model');

    get(this, 'member')
      .then((member) => {

        model.getRatingsContainer()
          .then(ratingsContainer => {

            let rating = get(this, 'store')
              .createRecord('rating', {
                item: ratingsContainer,
                value: get(this, 'memberRating'),
                date: moment.utc().unix()
              });

            rating
              .save()
              .then(rating => {
                get(ratingsContainer, 'ratings').pushObject(rating);
                get(member, 'ratings').pushObject(rating);
                set(rating, 'member', member);

                ratingsContainer.save();
                member.save();
                rating.save();
              })
              .catch(Em.Logger.error);
          });
      });

  },


  actions: {

    addNewRating() {
      this.addNewRating();
    },

    setNewRatingValue(val) {
      set(this, 'memberRating', val);
      this.addNewRating();
    }
  }

});
