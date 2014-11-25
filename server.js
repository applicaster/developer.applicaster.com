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
  app.set('view engine', 'jade');
  app.use(passport.initialize());
  app.use(passport.session());
  app.use( '/public', express.static(EXPRESS_ROOT + '/public'));
  app.use( '/released', ensureAuthenticated, express.static(EXPRESS_ROOT + '/released'));
  app.use( '/internal', ensureInternalAuthenticated, express.static(EXPRESS_ROOT + '/internal'));

  app.listen(EXPRESS_PORT);

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

  app.all('*', function (req, res) {
    res.send('Not found', 404);
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
      console.log(req.profile);
      return next();
    }
    res.redirect('/auth/applicaster/callback');
  }
};
