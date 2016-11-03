// require the data in friends.js
var friends = require('../data/friends.js');

// wrap the routes in a function for exporting
function apiRoutes(app) {

	// GET route for the link that displays all friends data (in the html footer)
	app.get('/api/friends', function (req, res) {
    	res.json(friends);
		});


	// POST route to handle matching new user data to the data already stored in friends.js
	 app.post('/api/friends', function (req, res) {

	 	// new array to hold our friend comparisons,  including their comparison scores
	 	var friendCompares = [];


	 	// store the req info (just the name, photo, scores) in an object --  will push this into the friends.js file later 
	 	var newUser = {
      	name: req.body.name,
      	photo: req.body.photo,
      	scores: req.scores
		};


    	// loop through friends in friends.js	
    	for(var i = 0; i < friends.length; i++){

    		// set up an array to capture a 1 to 1 comparison score between the newUser and all the objects in friends.js
    		var compareScores = [];


    		// loop through the scores for each object
    		for(var j = 0; j < friends[i].scores.length; j++){
    			// if the object's score is less than the user's score at same position
				if(friends[i].scores[j] < req.body.scores[j]){
					// subtract to get the difference in scores at that position and push into the compare array
	             	scoreDiff = req.body.scores[j] - friends[i].scores[j];
	             	compareScores.push(scoreDiff);
				}
    			// if the object's score is greater than the user's score at same position
    			else if(friends[i].scores[j] > req.body.scores[j]){
             		// subtract to get the difference in scores at that position and push into the compare array
             		scoreDiff = friends[i].scores[j] - req.body.scores[j];
					compareScores.push(scoreDiff);
				}
				// if the scores are equal
				else if(friends[i].scores[j] == req.body.scores[j]){
            		scoreDiff = 0;
            		compareScores.push(scoreDiff);
				}
			}

			// add up all the score differences in the compareScores array using  .reduce
			compareScores.reduce(add, 0);
				function add(a, b) {
				return a + b;
				};

			friendCompares.push({
				name: friends[i].name,
				photo: friends[i].photo,
				compareScore : compareScores
			});

		};
		
	// find the object in the friendCompares array with the lowest compareScore,  and thus the least amount of difference (best friend match) 
	var min = Math.min.apply(Math,friendCompares.map(function(o){return o.compareScore;}));

	//find the friend with that minimum compareScore
	var result = friendCompares.filter(function( obj ) {
  	return obj.compareScore == min;
		});

	res.json(result);


	// finally, push this current user's data into the friends.js file,  adding this user to the friends array for comparison by later visitors
	friends.push(newUser);
	});

};




module.exports = apiRoutes;