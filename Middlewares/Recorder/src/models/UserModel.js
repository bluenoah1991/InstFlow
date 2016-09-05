"use strict";

import Sequelize from 'sequelize';
import {sequelize_, _BaseModel} from '../DbConnection';

var UserModel = sequelize_.define('user', _BaseModel({
    channel_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    name: Sequelize.STRING,
    extra: Sequelize.TEXT
}));

UserModel.sync({force: true});

export default UserModel;