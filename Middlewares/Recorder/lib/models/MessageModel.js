"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _DbConnection = require('../DbConnection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageModel = _DbConnection.sequelize_.define('message', (0, _DbConnection._BaseModel)({
    msg_id: _sequelize2.default.STRING,
    text: _sequelize2.default.STRING,
    msg_type: _sequelize2.default.STRING,
    source: _sequelize2.default.STRING,
    agent: _sequelize2.default.STRING,
    user_id: _sequelize2.default.STRING,
    user_name: _sequelize2.default.STRING,
    channel_id: _sequelize2.default.STRING,
    conversation_id: _sequelize2.default.STRING,
    bot_id: _sequelize2.default.STRING,
    bot_name: _sequelize2.default.STRING,
    orientation: _sequelize2.default.INTEGER,
    time: _sequelize2.default.INTEGER
}));

MessageModel.sync({ force: true });

exports.default = MessageModel;
//# sourceMappingURL=MessageModel.js.map