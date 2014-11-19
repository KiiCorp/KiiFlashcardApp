App.SignupRoute = Ember.Route.extend({
  model: function() {
    var signup = App.Signup.create({
      email: null,
      password: null,
      passwordConfirm: null
    });
    return signup;
  },
  actions: {
    createAccount: function() {
      try {
        that = this
        var user = KiiUser.userWithUsername(this.context.email, this.context.password);
        user.register({
          success: function(theAuthedUser) {
            that.transitionTo('home');
          },
          failure: function(theUser, anErrorString) {
            console.log("error")
          },
        })
      } catch (e) {
        console.log(e);
      }
    }
  }
});


App.SigninRoute = Ember.Route.extend({
  model: function() {
    var signup = App.Signin.create({
      email: null,
      password: null
    });
    return signup;
  },
  actions: {
    signin: function() {
      try {
        that = this
        KiiUser.authenticate(this.context.email, this.context.password, {
          success: function(theAuthedUser) {
            that.transitionTo('home');
          },
          failure: function(theUser, anErrorString) {
            console.log("error")
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    var user = KiiUser.getCurrentUser()
    return user;
  },
  afterModel: function(user, transition) {
    if (user !== null) {
      this.transitionTo('home');
    }
  }
});

App.HomeRoute = Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      var user = KiiUser.getCurrentUser();
      if (user === null) {
        resolve(App.Home.create({
          user: null
        }));
      } else {
        var bucket = user.bucketWithName("words");
        bucket.count({
          success: function(bucket, query, count) {
            var home = App.Home.create({
              user: user,
              noMoreWords: count == 0
            });
            resolve(home);
          },
          failure: function(bucket, query, errorString) {
            console.log(4);
            console.log("Getting bucket failed: " + errorString);
            var home = App.Home.create({
              user: user,
              noMoreWords: true
            });
            reject(home);
          }
        });
      }
    });
  },
  afterModel: function(home, transition) {
    if (home.user == null) {
      this.transitionTo('index');
    }
  }
});
