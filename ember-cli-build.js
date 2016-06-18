/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Style Imports
  app.import({
    development: 'bower_components/bootstrap/dist/css/bootstrap.css',
    production: 'bower_components/bootstrap/dist/css/bootstrap.min.css'
  });
  app.import({
    development: 'bower_components/jquery-ui/themes/base/jquery-ui.css',
    production: 'bower_components/jquery-ui/themes/base/jquery-ui.min.css'
  });

  app.import('bower_components/jquery-ui/themes/base/datepicker.css');


  // JavaScript Imports
  app.import({
    development: 'bower_components/jquery-ui/jquery-ui.js',
    production: 'bower_components/jquery-ui/jquery.min.js'
  });

  app.import({
    development: 'bower_components/bootstrap/dist/js/bootstrap.js',
    production: 'bower_components/bootstrap/dist/js/bootstrap.min.js'
  });

  app.import({
    development: 'bower_components/moment/moment.js',
    production: 'bower_components/moment/min/moment.min.js'
  });

  app.import('bower_components/moment.twitter/moment-twitter.js');

  app.import('bower_components/jquery-ui/ui/datepicker.js');

  return app.toTree();
};
