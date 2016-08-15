import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('logout');
  this.route('welcome', function() {
    this.route('auth', {path: '/auth'});
    this.route('signup');
  });
  this.authenticatedRoute('home');
  this.route('reviews', function() {
    this.route('create');
    this.route('single');
  });
  this.route('recommendations', function() {
    this.route('single', {path: '/single/:id'});
    this.route('create');
  });
  this.route('market');
  this.route('contact');
  this.route('search', function() {
    this.route('tags', {path: '/:tagId'});
  });
});

export default Router;
