"use strict";

import Sequelize from 'sequelize';
import {sequelize_, _BaseModel} from '../DbConnection';

var MessageModel = sequelize_.define('message', _BaseModel({
    msg_id: Sequelize.STRING,
    text: Sequelize.STRING,
    msg_type: Sequelize.STRING,
    source: Sequelize.STRING,
    agent: Sequelize.STRING,
    user_id: Sequelize.STRING,
    user_name: Sequelize.STRING,
    channel_id: Sequelize.STRING,
    conversation_id: Sequelize.STRING,
    bot_id: Sequelize.STRING,
    bot_name: Sequelize.STRING,
    orientation: Sequelize.INTEGER,
    time: Sequelize.INTEGER
}));

MessageModel.sync({force: true});

export default MessageModel;