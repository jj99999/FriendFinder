// require the data in friends.js
var friends = require('../data/friends.js');

// wrap the routes in a function for exporting
function apiRoutes(app) {

	// GET route for the link that displays all friends data (in the html footer)
	app.get('/api/friends', function (req, res) {
    	res.json(friends);
		});


	// POST route to handle posting new user data,  and matching with someone from the list
	 app.post('/api/friends', function (req, res) {

	 	var newUser = {
      		name: req.body.name,
      		photo: req.body.photo,
      		scores: []
    		};

    	var scoresCompare = [];
    	
    	for(var i=0; i < req.body.scores.length; i++){
      		
      		scoresCompare.push( parseInt(req.body.scores[i]) )
    		}

		newUser.scores = scoresCompare;

}