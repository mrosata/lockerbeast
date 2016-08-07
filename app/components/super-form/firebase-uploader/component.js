import Em from 'ember';

export default Em.Component.extend({
  firebaseApp: Em.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    if (!get(this, 'storageRef')) {
      set(this, 'storageRef', get(this, 'firebaseApp').storage().ref());
    }
  },

  attemptFileUpload() {

  },

  onCompleted(downloadedUrl) {
    Em.Logger.log(`this`, this);
    set(this, 'value', downloadedUrl);
  },

  change() {
    let file = this.$('input[type=file]')[0].files[0];
    if (!file) {
      return;
    }
    const onCompleted = (fileLocation) => this.get('onCompleted').call(this, fileLocation);

    let uploadTask = get(this, 'storageRef')
      .child(file.name)
      .put(file);

    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      Em.Logger.info('State changed from fb!', snapshot);
    }, Em.Logger.error, function () {
      // Handle successful uploads on complete
      onCompleted(uploadTask.snapshot.downloadURL);
    });
  }

});

