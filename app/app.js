import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

window.get = function emberGetterCurry (context, property) {
  /* jshint unused:vars */
  if (arguments.length === 1) {
    return (prop) => Ember.get.apply(context, [context, prop]);
  }
  return Ember.get.apply(context, arguments);
};

// Note, this has curry-like behaviour but for speed I choose not to
// use a curry generator function but rather just hand implement the
// functionality. If `set` is called without all 3 arguments, the
// function returned by that first call is not curried. So on the
// second call you must supply the remaining arguments.
window.set = function emberSetterCurry (context, property, value) {
  /* jshint unused: vars */
  switch (arguments.length) {
    case 1:
      return (prop, val) => Ember.set.apply(context, [context, prop, val]);
    case 2:
      return (val) => Ember.set.apply(context, [context, property, val]);
  }
  return Ember.set.apply(context, arguments);
};

export default App;
