"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _DbConnection = require('../DbConnection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserModel = _DbConnection.sequelize_.define('user', (0, _DbConnection._BaseModel)({
    channel_id: _sequelize2.default.STRING,
    user_id: _sequelize2.default.STRING,
    name: _sequelize2.default.STRING,
    extra: _sequelize2.default.TEXT
}));

UserModel.sync({ force: true });

exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map