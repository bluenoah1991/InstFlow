"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Sqlite3Helper = require('../Sqlite3Helper');

var _Sqlite3Helper2 = _interopRequireDefault(_Sqlite3Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Sqlite3Helper2.default.define('user', {
    channel_id: _sequelize2.default.STRING,
    user_id: _sequelize2.default.STRING,
    name: _sequelize2.default.STRING,
    extra: _sequelize2.default.TEXT
});
//# sourceMappingURL=UserModel.js.map