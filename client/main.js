//This is the client javascript

console.log("hello world from client");

//Subscriptions
Meteor.subscribe('thePlayers');

PlayersList = new Mongo.Collection('players');

 //creating a collection named "players" inside our Mongo database. 


//Creating a helper function, depricated 
// Template.leaderboard.player = function(){
// 	//code goes here
// 	return "Some other text"
// }

//New way of creating helper functions
Template.leaderboard.helpers({
	'numberOfPlayers' : function(){
		return PlayersList.find().count();
	}, 
	'player' : function(){
		// var currentUserId = Meteor.userId();
		return PlayersList.find({}, {sort: {score:-1, name:1}});
	}
});


//Creating events
Template.leaderboard.events({
	//events go here
	'click .player' : function(){
		
		console.log("you clicked a .player element");
		

		//Creating  a session 
		var playerId = this._id;
		this.score += 5;
		//Session.set('selectedPlayer', playerId);
		//var selectedPlayer = Session.get('selectedPlayer');
		//console.log(selectedPlayer);
	}
});

Template.addPlayerForm.events({
	'submit form' :function(event){
		event.preventDefault();
		var playerNameVar = event.target.playerName.value;
 
        //calling method from client which would execute in the server
        Meteor.call('insertPlayerData',playerNameVar);
	}
});

