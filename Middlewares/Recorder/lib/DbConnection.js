"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequelize_ = undefined;
exports._BaseModel = _BaseModel;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _BaseModel(define) {
    var tt = {
        __sync__: {
            type: _sequelize2.default.BOOLEAN,
            defaultValue: false
        },
        __tries__: {
            type: _sequelize2.default.INTEGER,
            defaultValue: 0
        }
    };
    return Object.assign(tt, define);
};

var sequelize_ = exports.sequelize_ = new _sequelize2.default(null, null, null, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: process.env.RECORDER_STORAGE_PATH || './recorded_data.sqlite3'
});
//# sourceMappingURL=DbConnection.js.map