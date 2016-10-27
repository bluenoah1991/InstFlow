"use strict";

import async from 'async';
import Schedule_ from 'node-schedule';
import {UserModel, MessageModel} from './models';
import {CommonSerializer, IdentitySerializer} from './Serializer';
import HttpProxy from './HttpProxy';

class Schedule {
    constructor(){
        let interval = process.env.SYNC_INTERVAL || 5;
        this.rule = `*/${interval} * * * *`;
        this.syncJob = Schedule_.scheduleJob(this.rule, this.sync.bind(this));
    }

    syncModel(model, resourcePath, identities){
        model.findAll({where: {__sync__: false, __tries__: {$lt: 3}}}).then(function(instances){
            var httpProxy = new HttpProxy();
            async.each(instances, function(instance, callback){
                instance.increment('__tries__').then(function(){
                    httpProxy.post(resourcePath, CommonSerializer(instance));
                    callback();
                }.bind(this));
            }, function(err){
                if(err){
                    console.log(err);
                } else if(httpProxy.hasCache()){
                    httpProxy.flush(function(err, data, resp){
                        if(err){
                            console.log(err);
                        } else {
                            model.update({__sync__: true}, { 
                                where: IdentitySerializer(data, identities)
                            });
                        }
                    });
                }
            });
        });
    }

    sync(){
        this.syncModel(UserModel, '/api/v1/users', ['channel_id', 'user_id']);
        this.syncModel(MessageModel, '/api/v1/messages', ['msg_id']);
    }

    saveUser(
        serviceUrl, bot_client_id, bot_client_name,
        user_client_id, user_client_name, channel_id, extra){
        return UserModel.findOrCreate({
            where: {
                channel_id: channel_id,
                user_client_id: user_client_id
            }, 
            defaults: {
                serviceUrl: serviceUrl,
                bot_client_id: bot_client_id,
                bot_client_name: bot_client_name,
                user_client_name: user_client_name,
                extra: extra
            }
        }).spread(function(instance, created){
            console.log(instance.get({plain: true}));
            return created;
        });
    }

    saveMessage(
        msg_id, msg_type, text, source, agent, serviceUrl, 
        user_client_id, user_client_name, bot_client_id, 
        bot_client_name, channel_id, conversation_id, orientation, time){
        return MessageModel.create({
            msg_id: msg_id,
            msg_type: msg_type,
            text: text,
            source: source,
            agent: agent,
            serviceUrl: serviceUrl,
            user_client_id: user_client_id,
            user_client_name: user_client_name,
            bot_client_id: bot_client_id,
            bot_client_name: bot_client_name,
            channel_id: channel_id,
            conversation_id: conversation_id,
            orientation: orientation,
            time: time
        }).then(function(instance){
            let instance_ = instance.get({plain: true});
            console.log(instance_.text);
            return instance_;
        });
    }
}

export default new Schedule();