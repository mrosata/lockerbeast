export function initialize(appInstance) {
  appInstance.inject('route', 'auth', 'service:auth');
  appInstance.inject('controller', 'auth', 'service:auth');
}

export default {
  name: 'auth-service',
  initialize
};
