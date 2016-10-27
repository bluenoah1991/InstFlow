"use strict";

import Sequelize from 'sequelize';
import {sequelize_, _BaseModel} from '../DbConnection';

var UserModel = sequelize_.define('user', _BaseModel({
    serviceUrl: Sequelize.STRING,
    bot_client_id: Sequelize.STRING,
    bot_client_name: Sequelize.STRING,
    user_client_id: Sequelize.STRING,
    user_client_name: Sequelize.STRING,
    channel_id: Sequelize.STRING,
    extra: Sequelize.TEXT
}));

UserModel.sync({force: true});

export default UserModel;