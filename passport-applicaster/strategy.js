/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth2')
  , Profile = require('./profile')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError
  , APIError = require('./errors/apierror');



function Strategy(options, verify) {
  options = options || {};
  var url = 'https://accounts.applicaster.com';
  options.authorizationURL = options.authorizationURL ||  url + '/oauth/authorize';
  options.tokenURL = options.tokenURL ||  url + '/oauth/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'applicaster';
  this._userProfileURL = options.userProfileURL || url + '/oauth/user.json';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 *
 * This function constructs a normalized profile, with the following properties:
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    var json;

    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }

      if (json && json.error && typeof json.error == 'string') {
        return done(new APIError(json.error));
      }
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json);
    profile.provider  = 'applicaster';
    profile.accessToken = accessToken;
    profile._raw = body;
    profile._json = json;


    done(null, profile);
  });
};

/**
 * Return extra parameters to be included in the authorization request.
 *
 * Adds type=web_server to params
 *
 * @return {Object} params
 */
Strategy.prototype.authorizationParams = function() {
  return { type: 'web_server' };
};

/**
 * Return extra parameters to be included in the token request.
 *
 * Adds type=web_server to params
 *
 * @return {Object} params
 */
Strategy.prototype.tokenParams = function() {
  return { type: 'web_server' };
};

/**
 * Parse error response from OAuth 2.0 token endpoint.
 *
 * @param {String} body
 * @param {Number} status
 * @return {Error}
 * @api protected
 */
Strategy.prototype.parseErrorResponse = function(body, status) {
  var json = JSON.parse(body);
  if (json.error && typeof json.error == 'string' && !json.error_description) {
    return new APIError(json.error);
  }
  return OAuth2Strategy.prototype.parseErrorResponse.call(this, body, status);
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
