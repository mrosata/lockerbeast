import Model from 'ember-data/model';
import { belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({
  member: belongsTo('member', {inverse: 'social'}),
  friends: hasMany('member', {inverse: null}),
  followers: hasMany('member', {inverse: null}),
  following: hasMany('member', {inverse: null})
});
