# Lockerbeast

LockerBeast is a user driven website for the lacrosse community to share recommendations, review gear and sell their own products at no charge. It is being developed over Ember.js, an excellent JavaScript framework for building ambitious apps.

## Contributing to development?

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/mrosata/lockerbeast.git` this repository
* `cd lockerbeast`
* `npm i && bower i`

## Running / Development

* `ember s`
* Visit [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember b` (development)
* `ember b --environment production` (production)

### Deploying

Coming soon.

### Models
##### Review
title, member, date, image, body, ratings

##### Recommendation
title, member, category, comments, body, url, image, ratings, date

##### Tag
name, reviews, recommendations, article, advert, item, count

##### Category
name, index, description

##### Item
title, body, category, comments, image, created, member, ratings

##### Advert
title, body, category, date, endDate, published, member, ratings

##### Member
firstName, lastName, username, email, birthday, gender, bio, photo, background, social, public, ratings, items, reviews, recommendations, fullName (CP)

##### Member-Social
member, friends, following, followers


### Components
These are a few of the custom components which are good to know about. 

```
    {{super-form}}
    {{super-form/select-menu}}
    {{super-form/firebase-uploader}}
    
    {{list-items}}
    {{list-items/recommendation}}
    {{list-items/market}}
    {{list-items/review}}
    {{list-items/short-text}}
```

#### Images attribution
Some images used have been taken by and graciously uploaded by talented artists whom contribute to Creative Commons repos such as https://stocksnap.io/. While their work is allowed to be used royalty free in most cases I would like to make note of a few below. 

|     |    |
|----------|-------------|
| Image: | public/img/sports_field_arial.jpg  |
| Original: | https://stocksnap.io/photo/PS9F6BF99L |
| Photographer:	| Liane Metzler |
| Dimensions:	| 4608 x 3072 |
| Size:	| 4.27 MB |
| Date added:	| August 19, 2015 |
| Tags:	| soccer field, stadium, sports, green, grass, architecture |
|  |  |
| Image: | public/img/stock/sports_field_paint_line.jpg |
| Original: | https://stocksnap.io/photo/UDXGDW6UY8 |
| Photographer:	| Sandro Schuh |
| Dimensions:	| 5184 x 3456 |
| Size:	| 1.93 MB |
| Date added:	| April 18, 2016 |
| Tags:	| grass, lawn, field, sports, soccer, football, outdoors, summer |
|  |  |
| Image: |public/img/between_lockerroom_and_the_field.jpg |
| Original: | https://stocksnap.io/photo/ZIS75NJPCB |
| Photographer: |	Abigail Keenan |
| Dimensions:	|2509 x 1673 |
| Size:	| 0.75 MB |
| Date added: |	February 13, 2015 |
| Tags:	|football, field, tunnel, stadium, sports, people, spectators | 
