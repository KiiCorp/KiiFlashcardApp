App = Ember.Application.create();

App.Router.map(function() {
  this.route("signup", {path: "/signup" });
  this.route("signin", {path: "/signin" });
  this.route("home", {path: "/home" });
  this.route("getNewWords", {path: "/get-new-words" });
  this.route("study", {path: "/study" });
});

Kii.initializeWithSite("65d7aa9f", "783a838509d4699162e2181a8eb191c8", KiiSite.JP);
