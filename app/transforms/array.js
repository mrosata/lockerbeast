import Em from 'ember';
import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(incoming) {
    return Em.typeOf(incoming) === "array" ? incoming: [];
  },

  serialize(outgoing) {
    const type = Em.typeOf(outgoing);
    if (type === "array") {
      return outgoing;
    }
    else if (type === "string") {
      return outgoing.split(',').map((item) => Em.$.trim(item));
    }
    else {
      return [];
    }
  }
});
