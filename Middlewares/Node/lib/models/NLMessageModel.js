"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _DbConnection = require('../DbConnection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NLMessageModel = _DbConnection.sequelize_.define('nlmessage', (0, _DbConnection._BaseModel)({
    ext_type: _sequelize2.default.STRING,
    msg_id: _sequelize2.default.STRING,
    msg_type: _sequelize2.default.STRING,
    text: _sequelize2.default.STRING,
    source: _sequelize2.default.STRING,
    agent: _sequelize2.default.STRING,
    serviceUrl: _sequelize2.default.STRING,
    user_client_id: _sequelize2.default.STRING,
    user_client_name: _sequelize2.default.STRING,
    bot_client_id: _sequelize2.default.STRING,
    bot_client_name: _sequelize2.default.STRING,
    channel_id: _sequelize2.default.STRING,
    conversation_id: _sequelize2.default.STRING,
    orientation: _sequelize2.default.INTEGER,
    state: _sequelize2.default.STRING,
    time: _sequelize2.default.INTEGER
}));

NLMessageModel.sync({ force: true });

exports.default = NLMessageModel;
//# sourceMappingURL=NLMessageModel.js.map