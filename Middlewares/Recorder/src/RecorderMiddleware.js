"use strict";

import "babel-polyfill";

import schedule from './Schedule';

export default class RecorderMiddleware {
    receive(event, next){
        let channel_id = event.address.channelId;
        let user_id = event.address.user.id;
        let name = event.address.user.name;
        let extra = null;
        if(event.address != undefined){
            extra = JSON.stringify(event.address);
        }
        schedule.saveUser(channel_id, user_id, name, extra);
        next();
    }
}