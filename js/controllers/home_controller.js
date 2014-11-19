App.HomeController = Ember.ObjectController.extend({
  noMoreWords: function () {
    return true;
  }.property('noMoreWords')
});
