"use strict";

import async from 'async';
import Schedule_ from 'node-schedule';
import {UserModel, MessageModel} from './models';
import httpProxy from './HttpProxy';

class Schedule {
    constructor(){
        let interval = process.env.RECORDER_SYNC_INTERVAL || 5;
        this.rule = `*/${interval} * * * *`;
        this.syncJob = Schedule_.scheduleJob(this.rule, this.sync);
    }

    sync(){
        UserModel.findAll({where: {__sync__: false, __tries__: {$lt: 3}}}).then(function(instances){
            async.each(instances, function(instance, callback){
                instance.increment('__tries__').then(function(){
                    httpProxy.post('/api/v1/users', {
                        channel_id: instance.channel_id,
                        user_id: instance.user_id,
                        name: instance.name,
                        extra: instance.extra
                    });
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
                            let channel_id = data.channel_id;
                            let user_id = data.user_id;
                            UserModel.update({__sync__: true}, { 
                                where: { 
                                    channel_id: channel_id,
                                    user_id: user_id
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    saveUser(channel_id, user_id, name, extra){
        return UserModel.findOrCreate({
            where: {
                channel_id: channel_id,
                user_id: user_id
            }, 
            defaults: {
                name: name,
                extra: extra
            }
        }).spread(function(instance, created){
            console.log(instance.get({plain: true}));
            return created;
        });
    }

    saveMessage(
        text, type, source, agent, user_id,
        user_name, channel_id, conversation_id,
        bot_id, bot_name, orientation){
        return MessageModel.create({
            text: text,
            type: type,
            source: source,
            agent: agent,
            user_id: user_id,
            user_name: user_name,
            channel_id: channel_id,
            conversation_id: conversation_id,
            bot_id: bot_id,
            bot_name: bot_name,
            orientation: orientation
        }).then(function(instance){
            let instance_ = instance.get({plain: true});
            console.log(instance_.text);
            return instance_;
        });
    }
}

export default new Schedule();