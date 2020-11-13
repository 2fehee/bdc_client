
exports.route = require('./route');

/*
 * GET home page.
 */
exports.index = function(req, res, next) {
	res.redirect('/');
};
