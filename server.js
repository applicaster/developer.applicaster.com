var utils = require('./utils');
var EXPRESS_PORT = process.env.PORT; 
var EXPRESS_ROOT = utils.consts.DESTINATION;
var LIVERELOAD_PORT = 35729;

var express = require('express'),
  passport = require('passport'),
  ApplicasterStrategy = require('./passport-applicaster/index.js').Strategy;

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
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var methodOverride = require('method-override');
  var session = require('express-session');
  var app = express();
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.set('view engine', 'jade');
  app.use(passport.initialize());
  app.use(passport.session());
  app.use( '/public', express.static(EXPRESS_ROOT + '/public'));
  app.use( '/released', ensureAuthenticated, express.static(EXPRESS_ROOT + '/released'));
  app.use( '/internal', ensureInternalAuthenticated, express.static(EXPRESS_ROOT + '/internal'));

  app.listen(EXPRESS_PORT);
  console.log('Server running on http://localhost:' + EXPRESS_PORT)

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  app.set('views', __dirname+'/src');
  app.set('view engine', 'jade');

  app.get('/', ensureAuthenticated, function(req, res){

    apis = require('./utils').getApis();
    if (!req.user.isInternalAuthenticated){
      var _ = require('lodash');
      apis = _.reject(apis, {internal: true});
    }
    res.render('index',{apis: apis});
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

  app.all('*', function (req, res) {
    res.status(404).render('error', {errMsg: "404 File Not Found<br>Please Contact support@applicaster.com "});
  });

  app.use(function(err, req, res, next){
    var errMsg = "Something Went Wrong<br>Please Contact support@applicaster.com"
    console.log(err.code)
    if (err.code == 'You are not authorized for this service.') {
      errMsg = "you are not authorised to access this service.<br>please contact support@applicaster.com to grant you access.";
    }
    res.status(500).render('error',{errMsg: errMsg});
  });


  function ensureInternalAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.isInternalAuthenticated) {
        return next();
      }
      else{
        res.status(403);
        res.send({ "error": '403' });
        return;
      }
    }
    res.redirect('/auth/applicaster/callback');
  }

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/applicaster/callback');
  }
};
