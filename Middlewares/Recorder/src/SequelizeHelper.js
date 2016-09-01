"use strict";

import Sequelize from 'sequelize';
import Schedule from 'node-schedule';
import {UserModel} from './models';

export function _BaseModel(){
    var tt = {
        __sync__: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    };
    return Object.assign({}, tt);
};

class SequelizeHelper {
    constructor(){
        this.sequelize = new Sequelize(null, null, null, {
            dialect: 'sqlite',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            storage: process.env.RECORDER_STORAGE_PATH || './recorded_data.sqlite3'
        });
        let interval = process.env.RECORDER_SYNC_INTERVAL || 5;
        this.rule = `*/${interval} * * * *`;
        this.syncJob = Schedule.scheduleJob(this.rule, this.sync);
    }

    sync(){
        
    }

    saveUser(channel_id, user_id, name, extra){
        return UserModel.sync({force: true}).then(function(){
            return UserModel.findOrCreate({
                where: {
                    channel_id: channel_id,
                    user_id: user_id
                }, 
                defaults: {
                    name: name,
                    extra: extra
                }
            });
        }).spread(function(user, created){
            console.log(user.get({plain: true}));
            return created;
        });
    }
}

export var sequelizeHelper = new SequelizeHelper();
