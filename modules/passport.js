const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const passportJWT = require("passport-jwt");
const {Strategy: LocalStrategy} = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {User} = require('../models');

passport.serializeUser((user, done) => {
  console.log('user, serializeUser>', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('id, deserializeUser>', id);
  try {
    User.findByPk(id)
      .then(user => {
        done(null, user);
      });
  } catch (error) {
    done(error);
  }
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({where: {email}});
    if (!user) {
      return done(null, false, {message: 'User not found'});
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return done(null, false, {message: 'Incorrect password'});
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({where: {googleId: profile.id}});
    if (!user) {
      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken
      });
      return done(null, newUser);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use('google', googleStrategy);
refresh.use('google', googleStrategy);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
  },
  function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findByPk(jwtPayload.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));

exports.isAuthenticated = (req, res, next) => {
  console.log('req', req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
