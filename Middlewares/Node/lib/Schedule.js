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

        this.httpProxy = new _HttpProxy2.default();
        var interval = process.env.SYNC_INTERVAL || 5;
        this.rule = '*/' + interval + ' * * * *';
        this.syncJob = _nodeSchedule2.default.scheduleJob(this.rule, this.sync.bind(this));
    }

    _createClass(Schedule, [{
        key: 'syncOutgoing',
        value: function syncOutgoing() {}
    }, {
        key: 'syncModel',
        value: function syncModel(model, resourcePath, conditions) {
            var where = { __sync__: false, __tries__: { $lt: 3 } };
            if (conditions != undefined) {
                Object.assign(where, conditions);
            }
            return model.findAll({ where: where }).then(function (instances) {
                return new Promise(function (resolve, reject) {
                    _async2.default.each(instances, function (instance, callback) {
                        instance.increment('__tries__').then(function () {
                            this.httpProxy.post(resourcePath, (0, _Serializer.CommonSerializer)(instance));
                            callback();
                        }.bind(this));
                    }.bind(this), function (err) {
                        resolve(err);
                    });
                }.bind(this));
            }.bind(this)).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'sync',
        value: function sync() {
            Promise.all([this.syncModel(_models.UserModel, '/api/v1/users'), this.syncModel(_models.MessageModel, '/api/v1/messages'), this.syncModel(_models.NLMessageModel, '/api/v1/nlmsg/incoming', { orientation: 1 })]).then(function () {
                if (this.httpProxy.hasCache()) {
                    this.httpProxy.flush(function (err, data, resp, req) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (req.method == 'post' && req.url == '/api/v1/users') {
                                _models.UserModel.update({ __sync__: true }, {
                                    where: (0, _Serializer.IdentitySerializer)(data, ['channel_id', 'user_id'])
                                });
                            } else if (req.method == 'post' && req.url == '/api/v1/messages') {
                                _models.MessageModel.update({ __sync__: true }, {
                                    where: (0, _Serializer.IdentitySerializer)(data, ['msg_id'])
                                });
                            } else if (req.method == 'post' && req.url == '/api/v1/nlmsg/incoming') {
                                _models.NLMessageModel.update({ __sync__: true }, {
                                    where: (0, _Serializer.IdentitySerializer)(data, ['msg_id'])
                                });
                            }
                        }
                    });
                }
            }.bind(this)).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'saveUser',
        value: function saveUser(serviceUrl, bot_client_id, bot_client_name, user_client_id, user_client_name, channel_id, extra) {
            return _models.UserModel.findOrCreate({
                where: {
                    channel_id: channel_id,
                    user_client_id: user_client_id
                },
                defaults: {
                    serviceUrl: serviceUrl,
                    bot_client_id: bot_client_id,
                    bot_client_name: bot_client_name,
                    user_client_name: user_client_name,
                    extra: extra
                }
            }).spread(function (instance, created) {
                console.log(instance.get({ plain: true }));
                return created;
            });
        }
    }, {
        key: 'saveMessage',
        value: function saveMessage(msg_id, msg_type, text, source, agent, serviceUrl, user_client_id, user_client_name, bot_client_id, bot_client_name, channel_id, conversation_id, orientation, time) {
            return _models.MessageModel.create({
                msg_id: msg_id,
                msg_type: msg_type,
                text: text,
                source: source,
                agent: agent,
                serviceUrl: serviceUrl,
                user_client_id: user_client_id,
                user_client_name: user_client_name,
                bot_client_id: bot_client_id,
                bot_client_name: bot_client_name,
                channel_id: channel_id,
                conversation_id: conversation_id,
                orientation: orientation,
                time: time
            }).then(function (instance) {
                var instance_ = instance.get({ plain: true });
                console.log(instance_.text);
                return instance_;
            });
        }
    }, {
        key: 'saveNLMessage',
        value: function saveNLMessage(ext_type, msg_id, msg_type, text, source, agent, serviceUrl, user_client_id, user_client_name, bot_client_id, bot_client_name, channel_id, conversation_id, orientation, time) {
            return _models.NLMessageModel.create({
                ext_type: ext_type,
                msg_id: msg_id,
                msg_type: msg_type,
                text: text,
                source: source,
                agent: agent,
                serviceUrl: serviceUrl,
                user_client_id: user_client_id,
                user_client_name: user_client_name,
                bot_client_id: bot_client_id,
                bot_client_name: bot_client_name,
                channel_id: channel_id,
                conversation_id: conversation_id,
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