import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.authenticatedRoute('home');
  this.route('welcome', function() {
    this.route('login');
    this.route('auth', {path: '/auth'});
  });
  this.route('reviews');
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
