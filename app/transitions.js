export default function(){
  this.transition(
    this.fromRoute('welcome.index'),
    this.fromRoute('reviews.index'),
    this.fromRoute('market.index'),
    this.fromRoute('dashboard.index'),
    this.toRoute('home'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('home.index'),
    this.toRoute('recommendations.index'),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.fromRoute('home.index'),
    this.toRoute('reviews.index'),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.fromRoute('recommendations.create'),
    this.toRoute('recommendations.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('reviews.create'),
    this.toRoute('reviews.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
