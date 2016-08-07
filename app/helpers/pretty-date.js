import Ember from 'ember';

export function prettyDate([date, dateFormat = 'MMM DD, YYYY']/*, hash*/) {
  let theDate = typeof date === "number" ? moment.unix(date).utc() : moment.utc(date);
  return theDate.format(dateFormat);
}

export default Ember.Helper.helper(prettyDate);
