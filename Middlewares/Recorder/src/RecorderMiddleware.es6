"use strict";

import sequelize from './Sqlite3Helper';

import {UserModel} from './models';

UserModel.sync({force: true}).then(function(){
    return UserModel.create({
        channel_id: 'test',
        user_id: 'codemeow',
        name: 'codemeow'
    });
});

export default class RecorderMiddleware {
    receive(event, next){
        console.log(event.text);
        next();
    }
}