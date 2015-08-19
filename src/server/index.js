import Hapi from 'hapi';
import _ from 'lodash';
import { applicasterAccounts } from './applicasterStrategy';
import { TOC_JSON } from '../shared/settings';
import dotenv from 'dotenv';

dotenv.load();

const server = new Hapi.Server();
server.connection({ port: process.env.PORT });

server.register({ register: applicasterAccounts, options: {} }, () => {

  server.views({
    engines: {
      html: require('handlebars'),
    },
    path: './src/client',
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'applicaster',
      handler: (request, reply) => {
        const data = {
          email: request.auth.credentials.data.email,
          mixpanelEnabled: process.env.MIXPANEL_ENABLED ? true : false,
        };
        reply.view('index', data);
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/favicon.png',
    config: {
      handler: (request, reply) => {
        reply.file('./src/client/favicon.png');
      },
    },
  });


  server.route({
    method: 'GET',
    path: '/prism.js',
    config: {
      handler: (request, reply) => {
        reply.file('./src/client/common/js/prism.js');
      },
    },
  });


  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      handler: {
        directory: {
          path: 'dist',
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    config: {
      auth: 'applicaster',
      handler: {
        directory: {
          path: 'public',
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/internal/{param*}',
    config: {
      auth: 'applicaster',
      plugins: {applicasterAccounts: {internal: true}},
      handler: {
        directory: {
          path: 'internal',
        },
      },
    },
  });
  server.route({
    method: 'GET',
    path: `/${TOC_JSON}`,
    config: {
      auth: 'applicaster',
      handler: (request, reply) => {
        let tocFile;
        if (_.includes(request.auth.credentials.globalRoles, 'docs:drafts')) {
          tocFile = './internal-toc.json';
        } else {
          tocFile = './public-toc.json';
        }
        reply.file(tocFile);
      },
    },
  });

  server.start(() => {
  });

});
