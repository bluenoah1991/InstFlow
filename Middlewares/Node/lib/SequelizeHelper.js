"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequelizeHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._BaseModel = _BaseModel;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _models = require('./models');

var _HttpProxy = require('./HttpProxy');

var _HttpProxy2 = _interopRequireDefault(_HttpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _BaseModel() {
    var tt = {
        __sync__: {
            type: _sequelize2.default.BOOLEAN,
            defaultValue: false
        }
    };
    return Object.assign({}, tt);
};

var SequelizeHelper = function () {
    function SequelizeHelper() {
        _classCallCheck(this, SequelizeHelper);

        this.sequelize = new _sequelize2.default(null, null, null, {
            dialect: 'sqlite',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            storage: process.env.RECORDER_STORAGE_PATH || './recorded_data.sqlite3'
        });
        var interval = process.env.RECORDER_SYNC_INTERVAL || 5;
        this.rule = '*/' + interval + ' * * * *';
        this.syncJob = _nodeSchedule2.default.scheduleJob(this.rule, this.sync);
    }

    _createClass(SequelizeHelper, [{
        key: 'sync',
        value: function sync() {
            _models.UserModel.findAll({ where: { __sync__: false } }).then(function (instances) {
                instances.forEach(function (instance, index) {
                    _HttpProxy2.default.post('/api/v1/users', {
                        channel_id: instance.channel_id,
                        user_id: instance.channel_id,
                        name: instance.name,
                        extra: extra
                    });
                });
                _HttpProxy2.default.flush();
            });
        }
    }, {
        key: 'saveUser',
        value: function saveUser(channel_id, user_id, name, extra) {
            return _models.UserModel.sync({ force: true }).then(function () {
                return _models.UserModel.findOrCreate({
                    where: {
                        channel_id: channel_id,
                        user_id: user_id
                    },
                    defaults: {
                        name: name,
                        extra: extra
                    }
                });
            }).spread(function (user, created) {
                console.log(user.get({ plain: true }));
                return created;
            });
        }
    }]);

    return SequelizeHelper;
}();

var sequelizeHelper = exports.sequelizeHelper = new SequelizeHelper();
//# sourceMappingURL=SequelizeHelper.js.map