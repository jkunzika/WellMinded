/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('support', {
    title: 'Support'
  });
};