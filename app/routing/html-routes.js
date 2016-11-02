// dependency for path-ing
var path = require('path');


// wrap both the routing statements in a function for exporting

function htmlRoutes (app) {

	// default route for URL
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/home.html'));
	});

	// route for survey page
	app.get('/survey', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});
};

module.exports = htmlRoutes;