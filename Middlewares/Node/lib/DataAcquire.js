"use strict";

require("babel-polyfill");

var _nodeUuid = require("node-uuid");

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _Schedule = require("./Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ORIENTATION_INCOMING = 1;
var ORIENTATION_OUTGOING = 2;

function AcquireUser(event) {
    var serviceUrl = event.address.serviceUrl;
    var bot_client_id = event.address.bot.id;
    var bot_client_name = event.address.bot.name;
    var user_client_id = event.address.user.id;
    var user_client_name = event.address.user.name;
    var channel_id = event.address.channelId;
    var extra = null;
    if (event.address != undefined) {
        extra = JSON.stringify(event.address);
    }
    _Schedule2.default.saveUser(serviceUrl, bot_client_id, bot_client_name, user_client_id, user_client_name, channel_id, extra);
}

function AcquireMessage(event, orientation) {
    var msg_id = _nodeUuid2.default.v1();
    var msg_type = event.type;
    var text = event.text;
    var source = event.source;
    var agent = event.agent;
    var serviceUrl = event.address.serviceUrl;
    var user_client_id = event.address.user.id;
    var user_client_name = event.address.user.name;
    var bot_client_id = event.address.bot.id;
    var bot_client_name = event.address.bot.name;
    var channel_id = event.address.channelId;
    var conversation_id = event.address.conversation.id;
    var time = new Date().getTime();
    _Schedule2.default.saveMessage(msg_id, msg_type, text, source, agent, serviceUrl, user_client_id, user_client_name, bot_client_id, bot_client_name, channel_id, conversation_id, orientation, time);
}

module.exports = function () {
    return {
        receive: function receive(event, next) {
            AcquireUser(event);
            AcquireMessage(event, ORIENTATION_INCOMING);
            next();
        },
        send: function send(event, next) {
            AcquireMessage(event, ORIENTATION_OUTGOING);
            next();
        }
    };
};
//# sourceMappingURL=DataAcquire.js.map