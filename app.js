/*jslint eqeq: true, indent: 2, node: true, plusplus: true, regexp: true, unparam: true, vars: true, nomen: true */
'use strict';

var express = require('express');
var app = express();

// Application configuration
app.set('env', 'development');
app.set('view cache', false);
app.set('json spaces', true);

// Log all requests.
app.use(require('./src/middleware').log);

// Mount the neuola-admin module.
app.use(require('./src')());

// Start an application running at port 3000.
app.listen(3000);

console.log('Server is running at 3000');
