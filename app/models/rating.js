import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  member: belongsTo('member', {inverse: 'ratings'}),
  recommendation: belongsTo('recommendation'),
  // item and item type will be used for lookups if needed
  itemId: attr(),
  itemType: attr()
});
