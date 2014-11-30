/**
* Module dependencies.
*/
var util = require('util')
, OAuth2Strategy = require('passport-oauth').OAuth2Strategy
, InternalOAuthError = require('passport-oauth').InternalOAuthError
, _ = require('lodash')
, baseURL = 'https://accounts.applicaster.com';

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


/**
* Retrieve user profile from Dropbox.
*
* This function constructs a normalized profile, with the following properties:
*
*   - `provider`         always set to `dropbox`
*   - `id`               the user's Dropbox ID
*   - `username`         the user's Dropbox username
*   - `displayName`      the user's full name
*   - `profileUrl`       the URL of the profile for the user on Dropbox
*   - `emails`           the user's email addresses
*
* @param {String} accessToken
* @param {Function} done
* @api protected
*/

Strategy.prototype.authorizationParams = function() {
  return { type: 'web_server', client_env: 'production' };
}

Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(baseURL + '/oauth/user.json', accessToken, function (err, body, res) {
    if (err) { console.log('err'); return done(new InternalOAuthError('failed to fetch user profile', err)); }

      try {
        var json = JSON.parse(body);

        var profile = { provider: 'applicaster' };
        var profile = { provider: 'applicaster' };
        profile.accessToken = accessToken;
        profile.isInternalAuthenticated = _.find(json.accounts, {name: 'Applicaster'});

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
