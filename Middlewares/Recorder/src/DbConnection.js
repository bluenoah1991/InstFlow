"use strict";

import Sequelize from 'sequelize';

export function _BaseModel(define){
    var tt = {
        __sync__: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    };
    return Object.assign(tt, define);
};

export var sequelize_ = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: process.env.RECORDER_STORAGE_PATH || './recorded_data.sqlite3'
});
