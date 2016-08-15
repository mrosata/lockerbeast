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
  this.authenticatedRoute('reviews', function() {
    this.route('create');
    this.route('single');
  });
  this.authenticatedRoute('recommendations', function() {
    this.route('single', {path: '/single/:id'});
    this.route('create');
  });
  this.authenticatedRoute('market');
  this.route('contact');
  this.authenticatedRoute('search', function() {
    this.route('tags', {path: '/:tagId'});
  });

  this.route('four-oh-four', {path: '/*path'});
  this.route('dashboard', function() {
    this.route('profile');
  });
});

export default Router;
