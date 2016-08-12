var restify = require('restify');
var builder = require('botbuilder');
var fs = require('fs');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3979, function () {
//    console.log('%s listening to %s', server.name, server.url); 
// });
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
// server.post('/api/messages', connector.listen());

console.log('Send message');

var address = {
    "useAuth": true,
    "serviceUrl": "https://skype.botframework.com",
    "bot": {
        "name": "Hummingbird - Development",
        "id": "28:b8870809-9101-48e1-8cb9-a121ce01a0b3" 
    },
    "user": {
        "id": "29:1oGKZFdAfx5KqWQaOG8YHBQpWdmPEnSXokWii1b61y6I" 
    },
    "channelId": "skype"
};

bot.dialog('/send', function(session){
    session.send('Hi, I\'m from local.');
    console.log('Send sucessfully!');
});

connector.startConversation(address, function(err, address){
    bot.beginDialog(address, '/send');
});