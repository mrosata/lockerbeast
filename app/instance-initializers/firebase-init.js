/**
 * [Instance Initializer] - Firebase Init.
 *
 * Initialize the global `firebase` object so that it can be used in
 * Auth.
 */
import firebaseConfig from 'lockerbeast/config/environment';

export function initialize(/* appInstance */) {
  // initialize firebase.
  firebase.initializeApp(firebaseConfig.firebase);
}

export default {
  name: 'firebase-init',
  initialize
};
