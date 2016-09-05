"use strict";

import Schedule_ from 'node-schedule';
import {UserModel} from './models';
import httpProxy from './HttpProxy';

class Schedule {
    constructor(){
        let interval = process.env.RECORDER_SYNC_INTERVAL || 5;
        this.rule = `*/${interval} * * * *`;
        this.syncJob = Schedule_.scheduleJob(this.rule, this.sync);
    }

    sync(){
        UserModel.findAll({where: {__sync__: false}}).then(function(instances){
            instances.forEach(function(instance, index){
                httpProxy.post('/api/v1/users', {
                    channel_id: instance.channel_id,
                    user_id: instance.channel_id,
                    name: instance.name,
                    extra: instance.extra
                });
            });
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
        }).spread(function(user, created){
            console.log(user.get({plain: true}));
            return created;
        });
    }
}

export default new Schedule();