"use strict";

import Sequelize from 'sequelize';
import sequelize from '../Sqlite3Helper';

export default sequelize.define('user', {
    channel_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    name: Sequelize.STRING,
    extra: Sequelize.TEXT
});