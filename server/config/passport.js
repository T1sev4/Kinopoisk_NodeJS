const passport = require('passport');
const User = require('../auth/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Client_ID 90208152530-9c97pegr2kj5srb5fnf2ockqaadtpc0q.apps.googleusercontent.com
// Client_Secret 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



passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      User.findOne({ email })
        .then((user) => {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              return done(err);
            }

            if (result) {
              return done(null, user);
            }
          });
        })
        .catch((e) => {
          return done(e);
        });
    }
  )
);


passport.use(new GoogleStrategy({
  clientID: '90208152530-9c97pegr2kj5srb5fnf2ockqaadtpc0q.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:8000/api/auth/google",
  scope: ['openid', 'email', 'profile']
},
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    const newUser = await new User({
      googleId: profile.id,
      full_name: profile.displayName,
      email: profile.emails[0].value
    }).save()

    return cb(null, newUser);
    
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});
