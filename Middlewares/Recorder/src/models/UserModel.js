"use strict";

import Sequelize from 'sequelize';
import {sequelizeHelper as sh, _BaseModel} from '../SequelizeHelper';

export default sh.sequelize.define('user', Object.assign(_BaseModel(), {
    channel_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    name: Sequelize.STRING,
    extra: Sequelize.TEXT
}));