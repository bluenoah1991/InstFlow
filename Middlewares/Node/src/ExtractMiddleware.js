"use strict";

import "babel-polyfill";
import uuid from 'node-uuid';

import schedule from './Schedule';

const ORIENTATION_INCOMING = 1;
const ORIENTATION_OUTGOING = 2;


function ExtractUser(event){
    let serviceUrl = event.address.serviceUrl;
    let bot_client_id = event.address.bot.id;
    let bot_client_name = event.address.bot.name;
    let user_client_id = event.address.user.id;
    let user_client_name = event.address.user.name;
    let channel_id = event.address.channelId;
    let extra = null;
    if(event.address != undefined){
        extra = JSON.stringify(event.address);
    }
    schedule.saveUser(
        serviceUrl=serviceUrl,
        bot_client_id=bot_client_id,
        bot_client_name=bot_client_name,
        user_client_id=user_client_id,
        user_client_name=user_client_name,
        channel_id=channel_id,
        extra=extra
    );
}

function ExtractMessage(event, orientation){
    let msg_id = uuid.v1();
    let msg_type = event.type;
    let text = event.text;
    let source = event.source;
    let agent = event.agent;
    let serviceUrl = event.address.serviceUrl;
    let user_client_id = event.address.user.id;
    let user_client_name = event.address.user.name;
    let bot_client_id = event.address.bot.id;
    let bot_client_name = event.address.bot.name;
    let channel_id = event.address.channelId;
    let conversation_id = event.address.conversation.id;
    let time = new Date().getTime();
    schedule.saveMessage(
        msg_id=msg_id,
        msg_type=msg_type,
        text=text,
        source=source,
        agent=agent,
        serviceUrl=serviceUrl,
        user_client_id=user_client_id,
        user_client_name=user_client_name,
        bot_client_id=bot_client_id,
        bot_client_name=bot_client_name,
        channel_id=channel_id,
        conversation_id=conversation_id,
        orientation=orientation,
        time=time
    );
}

export default class ExtractMiddleware {
    receive(event, next){
        ExtractUser(event);
        ExtractMessage(event, ORIENTATION_INCOMING);
        next();
    }

    send(event, next){
        ExtractMessage(event, ORIENTATION_OUTGOING);
        next();
    }

}