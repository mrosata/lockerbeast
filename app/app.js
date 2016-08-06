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
window.get = (context, prop) => typeof context.get === "function" ? context.get(prop) : context[prop];
window.set = (context, prop, val) => typeof context.set === "function" ? context.set(prop, val) : (context[prop] = val);
export default App;
