/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('patient', {
    title: 'Patient'
  });
};
