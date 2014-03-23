/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var express = require('express');
var os = require('os');

require('tungus');
var app = express();

// Application configuration
app.set('env', 'development');
app.set('view cache', false);
app.set('json spaces', true);

// Only start listening on 3000 when this file is run directly.
if (!module.parent) {
  // Log all requests.
  app.use(require('./src/middleware').log);

  // Construct a test user...
  app.use(function (req, res, next) {
    req.user = {
      _id: 'test',
      name: 'Tester',
      email: 'test@test.com'
    };
    next();
  });

  if (process.argv.length > 2) {
    // Mount the neuola-admin module.
    app.use(require('./src')({
      db: process.argv[2]
    }));
  } else {
    console.log('Plese specify a MongoDB-compatible connection URL.');
    process.exit(-1);
  }

  // Start an application running at port 3000.
  app.listen(3000);

  console.log('Server is running at 3000');
} else {
  module.exports = function (config) {
    // Mount the neuola-admin module.
    app.use(require('./src')(config));
    return app;
  };
}
