import Em from 'ember';

export default Em.Mixin.create({

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
          alert(get(this, 'constructor.modelName'));
          ratableContent = this.store.createRecord('ratable-content', {
            // Need to dynamically create this property
            // ['review'] or ['recommendation'] or ['article']
            [get(this, 'constructor.modelName')]: this
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
