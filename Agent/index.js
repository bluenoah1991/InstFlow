var builder = require('botbuilder');
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer;

// Setup Kafka Consumer
var client = new kafka.Client();
var consumer = new Consumer(client, [
    {topic: 'COMMIT_MESSAGE'}
], {
    groupId: 'bot-agent'
});

consumer.on('message', function(message){
    // Create chat bot
    var connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });
    var bot = new builder.UniversalBot(connector);
});

