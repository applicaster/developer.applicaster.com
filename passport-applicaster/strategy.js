/**
* Module dependencies.
*/
var util = require('util')
, OAuth2Strategy = require('passport-oauth').OAuth2Strategy
, InternalOAuthError = require('passport-oauth').InternalOAuthError
, _ = require('lodash')
, baseURL = 'https://accounts2.applicaster.com';

function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || baseURL +'/oauth/authorize';
  options.tokenURL = options.tokenURL || baseURL + '/oauth/token';
  options.scopeSeparator = options.scopeSeparator || ',';
  options.customHeaders = options.customHeaders || {};

  OAuth2Strategy.call(this, options, verify);
  this.name = 'applicaster';
}

/**
* Inherit from `OAuth2Strategy`.
*/
util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.authorizationParams = function() {
  return {};
}

Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(baseURL + '/api/v1/users/current.json', accessToken, function (err, body, res) {
    if (err) { console.log('err', err); return done(new InternalOAuthError('failed to fetch user profile', err)); }

      try {
        var json = JSON.parse(body);
        var profile = { provider: 'applicaster' };
        profile.accessToken = accessToken;
        var admin = json.admin;
        var docs_internal = _.indexOf(json.global_roles, "docs:drafts") > -1 ;
        profile.isInternalAuthenticated = admin || docs_internal;
        done(null, profile);
      } catch(e) {
        done(e);
      }
    });
  }


  /**
  * Expose `Strategy`.
  */
  module.exports = Strategy;
