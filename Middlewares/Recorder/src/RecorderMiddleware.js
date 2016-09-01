"use strict";

import sequelize from './SequelizeHelper';

export default class RecorderMiddleware {
    receive(event, next){
        console.log(event.text);
        next();
    }
}