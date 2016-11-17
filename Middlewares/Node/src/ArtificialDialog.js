"use strict";

import "babel-polyfill";
import uuid from 'node-uuid';

import {Library, SimpleDialog} from 'botbuilder';
import schedule from './Schedule';

function AcquireMessage(session, ext_type){
    let msg_id = uuid.v1();
    let msg_type = session.message.type;
    let text = session.message.text;
    let source = session.message.source;
    let agent = session.message.agent;
    let serviceUrl = session.message.address.serviceUrl;
    let user_client_id = session.message.address.user.id;
    let user_client_name = session.message.address.user.name;
    let bot_client_id = session.message.address.bot.id;
    let bot_client_name = session.message.address.bot.name;
    let channel_id = session.message.address.channelId;
    let conversation_id = session.message.address.conversation.id;
    let time = new Date().getTime();
    schedule.saveNLMessage(
        ext_type, msg_id, msg_type, text, source, agent, serviceUrl, 
        user_client_id, user_client_name, bot_client_id, bot_client_name, 
        channel_id, conversation_id, 1, time
    );
}

module.exports = function(){
    var lib = new Library('artificial');

    lib.dialog('/', function(session, args){
        if(session.message.text != undefined && session.message.text.trim().toUpperCase() == 'Q'){
            session.send('Exit the Artificial Service.');
            AcquireMessage(session, 'close');
            session.endDialog();
        } else if(args != undefined && args.referer == '/start') {
            // notifying the instflow server that started a new dialog
            AcquireMessage(session, 'start');
        } else {
            // talk
            AcquireMessage(session, 'message');
        }
    });

    lib.dialog('/start', function(session, args){
        session.send('InstFlow Artificial Service (Enter Q exit):');
        session.replaceDialog('/', {
            referer: '/start'
        });
    });

    return lib;
};