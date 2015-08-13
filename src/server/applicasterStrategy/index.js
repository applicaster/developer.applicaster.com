import Bell from 'bell';
import Axios from 'axios';
import _ from 'lodash';
import dotenv from 'dotenv';

dotenv.load();

export const loggedInScheme = function(server, options) {
  let opts1 = {
    cookieOptions: {
      password: 'password',
      isSecure: false
    }
  };

  server.register({
    register: require('yar'),
    options: opts1
  }, function (err) { });

  return {
    authenticate: function(request, reply) {
      //console.log('----', request.route.settings.plugins);
      if (request.session.get('applicaster') == undefined) {
        reply('redirect to login').redirect('/auth/applicaster/callback');
      } else {
        Axios.get(`https://accounts2.applicaster.com/api/v1/users/current.json?access_token=${request.session.get('applicaster').token}`)
        .then(function (response) {
          reply.continue({credentials: {globalRoles: response.data.global_roles}});
        })
        .catch(function (response) {
          reply({err: 'err'});
        });
      }
    }
  };
};


let plugin = {
  register: (server, options, next) => {
    let login = {
      provider: {
        protocol: 'oauth2',
        auth: 'https://accounts2.applicaster.com/oauth/authorize',
        token: 'https://accounts2.applicaster.com/oauth/token',
        scopeSeparator: ',',
        profile: function (credentials, params, get, callback) {
          get('https://accounts2.applicaster.com/api/v1/users/current.json', params, function (profile) {
            credentials.profile = profile
            return callback();
          });
        }
      },
      password: 'password',
      isSecure: false,
      //location: server.info.uri,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    };
    server.register(Bell, (err) => {


      server.auth.strategy('login', 'bell', login);
      server.auth.scheme('myScheme', loggedInScheme);
      server.auth.strategy('applicaster', 'myScheme', false, {role:'docs:drafts' });

      server.route({
        method: 'GET',
        path:'/auth/applicaster/callback', 
        config: {
          auth: 'login',
          handler: (request, reply) => {
            let token = request.auth.credentials.token;
            request.session.set('applicaster', {token: token});
            reply().redirect('/');
          }
        }
      });
      next();
    });
  }
}

plugin.register.attributes = {
  name: 'applicasterAccounts',
  version: '1.0.0'
}


export var applicasterAccounts = plugin;
