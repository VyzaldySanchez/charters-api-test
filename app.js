'use strict';

var Hapi = require('hapi'),
  Joi = require('joi'),
  app = new Hapi.Server(),
  port = process.env.PORT || 3000,
  pack = require('./package'),
  chartersRoutes = require('./lib/routers/charters'),
  swaggerOptions = {
    apiVersion: pack.version,
    documentationPath: '/documentation'
  };

app.connection({
  port: port
});

app.route([{
  method: 'GET',
  path: '/',
  config: {
    handler: function(req, res) {
      res('Welcome').redirect('/charters');
    }
  },
}, {
  method: 'GET',
  path: '/charters',
  config: {
    handler: chartersRoutes.index,
    description: 'Show all registered charters',
    tags: ['api', 'charters']
  }
}, {
  method: 'GET',
  path: '/charters/{id}',
  config: {
    handler: chartersRoutes.getCharter,
    validate: {
      params: {
        id: Joi.number()
          .required()
          .description('This is the ID to identify the charter.')
      }
    },
    tags: ['api', 'charters'],
    description: 'Get one user\'s charter by his/her ID'
  }
}, {
  method: 'POST',
  path: '/charters',
  config: {
    handler: chartersRoutes.registerCharter,
    validate: {
      params: {
        charter: Joi.string()
          .regex(/^(\d{3})-(\d{7})-(\d{1})$/i)
          .required()
          .description('The charter to be saved.')
      }
    },
    tags: ['api', 'charters'],
    description: 'Register a charter to the docs collection'
  }
}]);


app.register([{
  //Register Swagger plugin for hapi.js api's documentation
  register: require('hapi-swagger'),
  options: swaggerOptions
}], function(err) {
  if (err) {
    app.log(['error'], 'hapi-swagger failed to load: ' + err);
  } else {
    app.log(['error'], 'hapi-swagger loaded');

    app.start(function() {
      console.log('App running on port', port);
    });
  }
});

module.exports = app;
