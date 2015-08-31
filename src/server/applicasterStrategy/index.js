import Bell from 'bell';
import Axios from 'axios';
import dotenv from 'dotenv';
import _ from 'lodash';
import { INTERNAL_ROLE } from '../../shared/settings';

const BASE_URL = 'https://accounts.applicaster.com';

const isInternalRoute = (request) => {
 return  _.get(request, 'route.settings.plugins.applicasterAccounts.internal');
}

dotenv.load();

export const loggedInScheme = (server) => {
  const opts = {
    cookieOptions: {
      password: 'password',
      isSecure: false,
    },
  };

  server.register({
    register: require('yar'),
    options: opts,
  }, () => { });

  return {
    authenticate: (request, reply) => {
      if (request.session.get('applicaster') === undefined) {
        request.session.clear('applicaster');
        reply.redirect('/auth/applicaster/callback');
      } else {
        Axios.get(`${BASE_URL}/api/v1/users/current.json?access_token=${request.session.get('applicaster').token}`)
        .then((response) => {
          if (isInternalRoute(request)) {
            if (!(_.includes(response.data.global_roles, INTERNAL_ROLE) || response.data.admin)) {
              throw new Error('permission denied!');
            }
          }
          reply.continue({credentials: {
            globalRoles: response.data.global_roles,
            data: response.data,
          }});
        })
        .catch((err) => {
          console.log(err);
          request.session.clear('applicaster');
          reply.redirect('/auth/applicaster/callback');
        });
      }
    },
  };
};

const plugin = {
  register: (server, options, next) => {
    const login = {
      provider: {
        protocol: 'oauth2',
        auth: `${BASE_URL}/oauth/authorize`,
        token: `${BASE_URL}/oauth/token`,
        scopeSeparator: ',',
        profile: (credentials, params, get, callback) => {
          get(`${BASE_URL}/api/v1/users/current.json`, params, (profile) => {
            credentials.profile = profile;
            return callback();
          });
        },
      },
      password: 'password',
      isSecure: false,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    };

    server.register(Bell, () => {
      server.auth.strategy('login', 'bell', login);
      server.auth.scheme('myScheme', loggedInScheme);
      server.auth.strategy('applicaster', 'myScheme', false, { role: INTERNAL_ROLE});

      server.route({
        method: 'GET',
        path: '/auth/applicaster/callback',
        config: {
          auth: 'login',
          handler: (request, reply) => {
            const token = request.auth.credentials.token;
            request.session.set('applicaster', {token: token});
            reply().redirect('/');
          },
        },
      });
      next();
    });
  },
};

plugin.register.attributes = {
  name: 'applicasterAccounts',
  version: '1.0.0',
};

export const applicasterAccounts = plugin;
