"use strict";

import Sequelize from 'sequelize';
import {sequelize_, _BaseModel} from '../DbConnection';

var NLMessageModel = sequelize_.define('nlmessage', _BaseModel({
    ext_type: Sequelize.STRING,
    msg_id: Sequelize.STRING,
    msg_type: Sequelize.STRING,
    text: Sequelize.STRING,
    source: Sequelize.STRING,
    agent: Sequelize.STRING,
    serviceUrl: Sequelize.STRING,
    user_client_id: Sequelize.STRING,
    user_client_name: Sequelize.STRING,
    bot_client_id: Sequelize.STRING,
    bot_client_name: Sequelize.STRING,
    channel_id: Sequelize.STRING,
    conversation_id: Sequelize.STRING,
    orientation: Sequelize.INTEGER,
    state: Sequelize.STRING,
    time: Sequelize.INTEGER
}));

NLMessageModel.sync({force: true});

export default NLMessageModel;