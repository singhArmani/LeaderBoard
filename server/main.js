import { Meteor } from 'meteor/meteor';

PlayersList = new Mongo.Collection('players');

console.log("Hello world from the server side!");

//Publications
Meteor.publish('thePlayers', function(){
	//inside the publish function
	//It's within this function that we specify what data should be available to users of the application. 
	var currentUserId = this.userId;
	return PlayersList.find({createdBy:currentUserId})
});

Meteor.startup(() => {
  // code to run on server at startup
});


//Methods 
//methods are blocks of code that are executed on the server after being triggered from the client.

Meteor.methods({
	//methods go here
	'insertPlayerData' : function(playerNameVar){
		var currentUserId = Meteor.userId();
		PlayersList.insert({
            name: playerNameVar,
            score: 0,
            createdBy: currentUserId
        });
	}
});
