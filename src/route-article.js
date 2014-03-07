
var router = module.exports = require('express').Router();

router.route('/create').get(function (req, res) {
  // TODO view the create page.
}).post(function (req, res) {
  // TODO post the article.
});

router.route('/delete/:article').post(function (req, res) {
  // TODO delete the article
});

router.route('/update/:article').get(function (req, res) {
  // TODO view the update page.
}).post(function (req, res) {
  // TODO update a specific article
});

router.route('/browse/:tag').get(function (req, res) {
  // Browse the articles, optionally by a tag.
});
