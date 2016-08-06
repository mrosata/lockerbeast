export function initialize(appInstance) {
  appInstance.inject('route', 'recordFactory', 'service:record-factory');
  appInstance.inject('controller', 'recordFactory', 'service:record-factory');
}

export default {
  name: 'record-factory-setup',
  initialize
};
