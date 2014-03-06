/**
 * The administration site for [Neuola][].
 * ==============================================
 *
 * The module exposes a function to return a [Express App][]. The function accepts a parameter which will be used by [Express][].
 *
 * As the [Express][]'s convention, the app context is designed to be mounted to any prefixes.
 *
 * [Neuola]: https://github.com/neuola/ "The project home."
 * [Express App]: http://expressjs.com/4x/api.html#express "Express Application Context."
 * [Express]: https://expressjs.com "The Express.js framework.'
 */

module.exports = require('./src');
