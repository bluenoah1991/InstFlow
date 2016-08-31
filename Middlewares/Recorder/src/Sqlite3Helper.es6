"use strict";

import Sequelize from 'sequelize';

export default new Sequelize(null, null, null, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './recorded_data.sqlite3'
});