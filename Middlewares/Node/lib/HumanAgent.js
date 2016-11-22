"use strict";

require("babel-polyfill");

var _nodeUuid = require("node-uuid");

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _botbuilder = require("botbuilder");

var _Schedule = require("./Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

var _Serializer = require("./Serializer");

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AcquireMessage(session, ext_type) {
    var msg_id = _nodeUuid2.default.v1();
    var msg_type = session.message.type;
    var text = session.message.text;
    var source = session.message.source;
    var agent = session.message.agent;
    var serviceUrl = session.message.address.serviceUrl;
    var user_client_id = session.message.address.user.id;
    var user_client_name = session.message.address.user.name;
    var bot_client_id = session.message.address.bot.id;
    var bot_client_name = session.message.address.bot.name;
    var channel_id = session.message.address.channelId;
    var conversation_id = session.message.address.conversation.id;
    var time = new Date().getTime();
    _Schedule2.default.saveNLMessage(ext_type, msg_id, msg_type, text, source, agent, serviceUrl, user_client_id, user_client_name, bot_client_id, bot_client_name, channel_id, conversation_id, 1, time);
}

function BeginOutgoingMessage(bot) {
    setTimeout(function () {
        _models.NLMessageModel.findAll({ where: {
                __sync__: false,
                state: 'sending',
                orientation: 2
            } }).then(function (instances) {
            return new Promise(function (resolve, reject) {
                _async2.default.each(instances, function (instance, callback) {
                    if (instance.conversation_id != undefined) {
                        (function () {
                            var msg = new _botbuilder.Message().address({
                                channelId: instance.channel_id,
                                user: {
                                    id: instance.user_client_id,
                                    name: instance.user_client_name
                                },
                                conversation: {
                                    id: instance.conversation_id
                                },
                                bot: {
                                    id: instance.bot_client_id,
                                    name: instance.bot_client_name
                                },
                                serviceUrl: instance.serviceUrl,
                                useAuth: true
                            }).text(instance.text);
                            var time = new Date().getTime();
                            bot.send(msg, function (err) {
                                console.log(err);
                                _models.NLMessageModel.update({ state: 'finish', time: time }, {
                                    where: (0, _Serializer.IdentitySerializer)(instance, ['msg_id'])
                                });
                                callback();
                            });
                        })();
                    } else {
                        callback();
                    }
                }.bind(this), function (err) {
                    resolve(err);
                });
            }.bind(this));
        }).then(function () {
            BeginOutgoingMessage(bot);
        });
    }, 1000);
}

module.exports = function (opts) {
    if (opts == undefined || opts.bot == undefined) {
        throw 'Option \'bot\' not found.';
    }

    var lib = new _botbuilder.Library('human_agent');

    lib.dialog('/', function (session, args) {
        if (session.message.text != undefined && session.message.text.trim().toUpperCase() == 'Q') {
            session.send('Exit Human Agent.');
            AcquireMessage(session, 'close');
            session.endDialog();
        } else if (args != undefined && args.referer == '/start') {
            // notifying the instflow server that started a new dialog
            AcquireMessage(session, 'start');
        } else {
            // talk
            AcquireMessage(session, 'message');
        }
    });

    lib.dialog('/start', function (session, args) {
        session.send('Enter Human Agent (Reply to Q exit):');
        session.replaceDialog('/', {
            referer: '/start'
        });
    });

    BeginOutgoingMessage(opts.bot);
    return lib;
};
//# sourceMappingURL=HumanAgent.js.map