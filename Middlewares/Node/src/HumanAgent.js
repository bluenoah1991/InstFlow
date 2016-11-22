"use strict";

import "babel-polyfill";
import uuid from 'node-uuid';
import async from 'async';

import {Message, Library, SimpleDialog} from 'botbuilder';
import schedule from './Schedule';
import { IdentitySerializer } from './Serializer';
import { NLMessageModel } from './models';

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

function BeginOutgoingMessage(bot){
    setTimeout(function(){
        NLMessageModel.findAll({ where: { 
            __sync__: false, 
            state: 'sending',
            orientation: 2
        }}).then(function (instances) {
            return new Promise(function (resolve, reject) {
                async.each(instances, function (instance, callback) {
                    if(instance.conversation_id != undefined){
                        let msg = new Message().address({
                            channelId: instance.channel_id,
                            user: {
                                id: instance.user_client_id,
                                name: instance.user_client_name
                            },
                            conversation: {
                                id: instance.conversation_id
                            },
                            bot: {
                                id: instance.bot_client_id,
                                name: instance.bot_client_name
                            },
                            serviceUrl: instance.serviceUrl,
                            useAuth: true
                        }).text(instance.text);
                        let time = new Date().getTime();
                        bot.send(msg, function(err){
                            console.log(err);
                            NLMessageModel.update({ state: 'finish', time: time }, {
                                where: IdentitySerializer(instance, ['msg_id'])
                            });
                            callback();
                        });
                    } else {
                        callback();
                    }
                }.bind(this), function (err) {
                    resolve(err);
                });
            }.bind(this));
        }).then(function(){
            BeginOutgoingMessage(bot);
        });
    }, 1000);
}

module.exports = function(opts){
    if(opts == undefined || opts.bot == undefined){
        throw 'Option \'bot\' not found.';
    }

    var lib = new Library('human_agent');

    lib.dialog('/', function(session, args){
        if(session.message.text != undefined && session.message.text.trim().toUpperCase() == 'Q'){
            session.send('Exit Human Agent.');
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
        session.send('Enter Human Agent (Reply to Q exit):');
        session.replaceDialog('/', {
            referer: '/start'
        });
    });

    BeginOutgoingMessage(opts.bot);
    return lib;
};