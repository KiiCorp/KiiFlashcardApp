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
        var user = KiiUser.userWithUsername(this.context.email, this.context.password);
        user.register({
          success: function(theAuthedUser) {
            console.log("success")
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
        KiiUser.authenticate(this.context.email, this.context.password, {
          success: function(theAuthedUser) {
            console.log("success")
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
