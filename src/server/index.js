import Hapi from 'hapi';
import { DOCS_FOLDER, TOC_JSON } from '../shared/settings';
import dotenv from 'dotenv';

dotenv.load();

const server = new Hapi.Server();

server.connection({ port: process.env.PORT });

server.register([require('vision'), require('inert')], () => {

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
      handler: (request, reply) => {
        reply.view('index');
      },
    },
  });

  server.route({
    method: 'GET',
    path: `/${DOCS_FOLDER}/{param*}`,
    config: {
      handler: (request, reply) => {
        reply.view('index');
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/home',
    config: {
      handler: (request, reply) => {
        reply.view('index');
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/products-list',
    config: {
      handler: (request, reply) => {
        reply.view('index');
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
      handler: {
        directory: {
          path: 'public',
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: `/${TOC_JSON}`,
    config: {
      handler: (request, reply) => {
        reply.file('./public-toc.json');
      },
    },
  });

  server.start(() => {});

});
