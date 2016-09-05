"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _models = require('./models');

var _HttpProxy = require('./HttpProxy');

var _HttpProxy2 = _interopRequireDefault(_HttpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schedule = function () {
    function Schedule() {
        _classCallCheck(this, Schedule);

        var interval = process.env.RECORDER_SYNC_INTERVAL || 5;
        this.rule = '*/' + interval + ' * * * *';
        this.syncJob = _nodeSchedule2.default.scheduleJob(this.rule, this.sync);
    }

    _createClass(Schedule, [{
        key: 'sync',
        value: function sync() {
            _models.UserModel.findAll({ where: { __sync__: false } }).then(function (instances) {
                instances.forEach(function (instance, index) {
                    _HttpProxy2.default.post('/api/v1/users', {
                        channel_id: instance.channel_id,
                        user_id: instance.channel_id,
                        name: instance.name,
                        extra: instance.extra
                    });
                });
                _HttpProxy2.default.flush(function (err, data, resp) {
                    if (err) {
                        console.log(err);
                    } else {
                        var channel_id = data.channel_id;
                        var user_id = data.user_id;
                        _models.UserModel.update({ __sync__: true }, {
                            where: {
                                channel_id: channel_id,
                                user_id: user_id
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'saveUser',
        value: function saveUser(channel_id, user_id, name, extra) {
            return _models.UserModel.findOrCreate({
                where: {
                    channel_id: channel_id,
                    user_id: user_id
                },
                defaults: {
                    name: name,
                    extra: extra
                }
            }).spread(function (user, created) {
                console.log(user.get({ plain: true }));
                return created;
            });
        }
    }]);

    return Schedule;
}();

exports.default = new Schedule();
//# sourceMappingURL=Schedule.js.map