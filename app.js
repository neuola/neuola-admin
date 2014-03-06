var app = require('./src');

/**
 * Start an application running at port 3000.
 */
app({
  'env': 'development',
  'view cache': false,
  'json spaces': true
}).listen(3000);

console.log('Server is running at 3000');
