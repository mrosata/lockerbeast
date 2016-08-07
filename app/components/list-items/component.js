import Em from 'ember';

export default Em.Component.extend({
  tagName: 'section',
  classNames: ['col-md-12', 'section-post-related'],

  listStyle: 'basic',
  items: null,

  maxLength: 100,

  // This will make the HTML Headline above list
  headline: {
    icon: 'news',
    text: '',
    letter: 'LB'
  }
});
