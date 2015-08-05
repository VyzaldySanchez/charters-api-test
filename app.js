'use strict';

var Hapi = require('hapi'),
    Joi = require('joi'),
    app = new Hapi.Server(),
    port = process.env.PORT || 3000,
    pack = require('./package.json'),
    swaggerOptions = {
      apiVersion: pack.version,
      documentationPath: '/documentation',
      apis:[
        {
          path: 'index'
        }
      ]
    };

module.exports = app;

app.connection({ port: port });

app.route([
  {
    method: 'GET',
    path: '/',
    config: {
      handler: function (req, res) {
        res('Welcome').redirect('/charters');
      }
    },
  },
  {
    method: 'GET',
    path: '/charters',
    config: {
      handler: function (req, res) {
        res(JSON.stringify({ greet: 'Hi' }));
      },
      description: 'Show all registered charters',
      tags: ['api', 'charters']
    }
  },
  {
    method: 'GET',
    path: '/lol/{id}',
    config: {
      handler: function (req, res) {
        res(JSON.stringify({ greet: 'Hi' }));
      },
      description: 'Show all registered charters',
      tags: ['api', 'lol'],
      validate: {
        params: {
          id: Joi.number()
                .required()
                .description('The example id.')
        }
      }
    }
  },
  {
    method: ['POST'],
    path: '/lol/{name}',
    config: {
      handler: function (req, res) {
        res(JSON.stringify({ greet: 'Hi' + req.params.name }));
      },
      description: 'Save a new charter',
      tags: ['api', 'lol'],
      validate: {
        params: {
          name: Joi.string()
                .required()
                .description('The example name.')
        }
      }
    }
  }
]);


app.register([
  {
    register: require('hapi-swagger'),
    options: swaggerOptions
  }
], function (err) {
  if (err) {
    app.log(['error'], 'hapi-swagger failed to load: ' + err);
  } else {
    app.log(['error'], 'hapi-swagger loaded');

    app.start(function () {
      console.log('App running on port', port);
    });
  }
});
