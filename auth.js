
const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "850709707723-rc40dbjv5clmq8fc0sf5im4quib4hji3.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const User = require("./models/User.model")


passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://task-managermx.herokuapp.com/profile",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ googleID: profile.id })
  .then(user => {
    if (user) {
      done(null, user);
      return;
    }
    console.log(profile)
    User.create({ googleID: profile.id })
      .then(newUser => {
        done(null, newUser);
      })
      .catch(err => done(err)); // closes User.create()
  })
  .catch(err => done(err)); // closes User.findOne()
  }
));

passport.serializeUser(function(user,done){
done(null,user)
});

passport.deserializeUser(function(user,done){
    done(null,user)
})