'use strict';

var Hapi = require('hapi'),
  Joi = require('joi'),
  app = new Hapi.Server(),
  port = process.env.PORT || 3000,
  pack = require('./package'),
  mongoose = require('mongoose'),
  chartersRoutes = require('./lib/routers/charters'),
  swaggerOptions = {
    apiVersion: pack.version,
    documentationPath: '/documentation'
  },
  dbUrl = 'mongodb://localhost:27017/test',
  dbOptions = {
    db: {
      native_parser: true
    },
    server: {
      poolSize: 5
    }
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
        id: Joi.string()
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
      payload: {
        charter: Joi.string()
          .regex(/^(\d{3})-(\d{7})-(\d{1})$/i)
          .required()
          .description('The charter to be saved.')
      }
    },
    tags: ['api', 'charters'],
    description: 'Register a charter to the docs collection'
  }
}, {
  method: 'PUT',
  path: '/charters/{charterId}/update',
  config: {
    handler: chartersRoutes.updateCharter,
    validate: {
      payload: {
        newCharter: Joi.string()
          .regex(/^(\d{3})-(\d{7})-(\d{1})$/i)
          .required()
          .description('New charter\'s value.')
      },
      params: {
        charterId: Joi.string()
          .required()
          .description('The charter\'s ID that is going to be update'),
      }
    },
    tags: ['api', 'charters'],
    description: 'Updates a charter based on the ID given.'
  }
}, {
  method: 'DELETE',
  path: '/charters/{id}/delete',
  config: {
    handler: chartersRoutes.deleteCharter,
    validate: {
      params: {
        id: Joi.string()
          .required()
          .description('The id to search to delete a charter with this id')
      }
    },
    tags: ['api', 'charters'],
    description: 'Deletes a charter from the collection'
  }
}]);

app.register([{
  //Register Swagger plugin for hapi.js api's documentation
  register: require('hapi-swagger'),
  options: swaggerOptions
}], function(err) {
  if (err) {
    app.log(['error'], 'plugins failed to load: ' + err);
  } else {
    app.log(['error'], 'plugins loaded');


    mongoose.connect(dbUrl, dbOptions, function(err) {
      if (err) app.log('error', err);
      app.start(function() {
        console.log('App running on port', port);
      });
    });
  }
});

module.exports = {
  app: function() {
    return app;
  },
  mongoose: function() {
    return mongoose;
  },
  db: function() {
    return mongoose.connection;
  }
};
