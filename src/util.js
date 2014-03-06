/**
 * The utilities function.
 *
 * @author yfwz100
 */

// The log function.
exports.log = function log(req, res, next) {
  console.log('Visited ' + req.path);
  next();
};

// The short-hand method to navigate to a page.
exports.toPage = function (page) {
  // A simple wrapper to naviage to a page.
  return function navigate(req, res) {
    res.render(page);
  };
};

