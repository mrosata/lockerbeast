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
          ratableContent = this.store.createRecord('ratable-content', {
            // ['review'] or ['recommendation'] or ['article']
            [get(this, 'constructor.modelName')]: this
          });
          return ratableContent.save()
            .then(ratableContent => {
              set(this, 'ratableContent', ratableContent);
              this.save();
              return ratableContent;
            });
        }
        return ratableContent;
      });
  },

  getAverageRating() {
    return this.getRatingsContainer()
      .then(ratingsContainer => ratingsContainer.getAverageRating());
  }


});
