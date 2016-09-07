"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _models = require('./models');

var _Serializer = require('./Serializer');

var _HttpProxy = require('./HttpProxy');

var _HttpProxy2 = _interopRequireDefault(_HttpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schedule = function () {
    function Schedule() {
        _classCallCheck(this, Schedule);

        var interval = process.env.RECORDER_SYNC_INTERVAL || 5;
        this.rule = '*/' + interval + ' * * * *';
        this.syncJob = _nodeSchedule2.default.scheduleJob(this.rule, this.sync.bind(this));
    }

    _createClass(Schedule, [{
        key: 'syncModel',
        value: function syncModel(model, resourcePath, identities) {
            model.findAll({ where: { __sync__: false, __tries__: { $lt: 3 } } }).then(function (instances) {
                var httpProxy = new _HttpProxy2.default();
                _async2.default.each(instances, function (instance, callback) {
                    instance.increment('__tries__').then(function () {
                        httpProxy.post(resourcePath, (0, _Serializer.CommonSerializer)(instance));
                        callback();
                    }.bind(this));
                }, function (err) {
                    if (err) {
                        console.log(err);
                    } else if (httpProxy.hasCache()) {
                        httpProxy.flush(function (err, data, resp) {
                            if (err) {
                                console.log(err);
                            } else {
                                model.update({ __sync__: true }, {
                                    where: (0, _Serializer.IdentitySerializer)(data, identities)
                                });
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'sync',
        value: function sync() {
            this.syncModel(_models.UserModel, '/api/v1/users', ['channel_id', 'user_id']);
            this.syncModel(_models.MessageModel, '/api/v1/messages', ['msg_id']);
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
            }).spread(function (instance, created) {
                console.log(instance.get({ plain: true }));
                return created;
            });
        }
    }, {
        key: 'saveMessage',
        value: function saveMessage(msg_id, text, msg_type, source, agent, user_id, user_name, channel_id, conversation_id, bot_id, bot_name, orientation, time) {
            return _models.MessageModel.create({
                msg_id: msg_id,
                text: text,
                msg_type: msg_type,
                source: source,
                agent: agent,
                user_id: user_id,
                user_name: user_name,
                channel_id: channel_id,
                conversation_id: conversation_id,
                bot_id: bot_id,
                bot_name: bot_name,
                orientation: orientation,
                time: time
            }).then(function (instance) {
                var instance_ = instance.get({ plain: true });
                console.log(instance_.text);
                return instance_;
            });
        }
    }]);

    return Schedule;
}();

exports.default = new Schedule();
//# sourceMappingURL=Schedule.js.map