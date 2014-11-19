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
            window.sessionStorage.setItem('user', theAuthedUser);
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
            window.sessionStorage.setItem('user', theAuthedUser);
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
    var user = window.sessionStorage.getItem('user')
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
    var user = window.sessionStorage.getItem('user')
    return user;
  },
  afterModel: function(user, transition) {
    if (user == null) {
      this.transitionTo('index');
    }
  }
});
