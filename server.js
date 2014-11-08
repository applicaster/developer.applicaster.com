var EXPRESS_PORT = process.env.PORT;
var EXPRESS_ROOT = './dist';
var LIVERELOAD_PORT = 35729;


var express = require('express')
  , passport = require('passport')
  , ApplicasterStrategy = require('./passport-applicaster/index.js').Strategy;


passport.use(new ApplicasterStrategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "/auth/applicaster/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


module.exports = function() {
  var express = require('express');
  var morgan = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  var session = require('express-session');
  var app = express();
  app.use(morgan());
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);
  app.use(require('connect-livereload')());
  app.use( ensureAuthenticated, express.static(EXPRESS_ROOT));


  app.listen(EXPRESS_PORT);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  app.get('/access-token', ensureAuthenticated, function(req, res){
    res.send({ "accessToken": req.user.accessToken });
  });

  app.get('/auth/applicaster/callback',
    passport.authenticate('applicaster', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/auth/applicaster',
    passport.authenticate('applicaster'),
    function(req, res){
    }
  );


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  function ensureAuthenticated(req, res, next) {
    switch(req.path) {
        case '/auth/applicaster/callback':
        case '/auth/applicaster':
        case 'logout':
            return next();
            break;
    }
    if (req.path )
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/auth/applicaster/callback');
  }


}
