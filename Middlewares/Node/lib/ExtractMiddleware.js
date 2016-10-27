"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("babel-polyfill");

var _nodeUuid = require("node-uuid");

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _Schedule = require("./Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ORIENTATION_INCOMING = 1;
var ORIENTATION_OUTGOING = 2;

function ExtractUser(event) {
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
    _Schedule2.default.saveUser(serviceUrl = serviceUrl, bot_client_id = bot_client_id, bot_client_name = bot_client_name, user_client_id = user_client_id, user_client_name = user_client_name, channel_id = channel_id, extra = extra);
}

function ExtractMessage(event, orientation) {
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
    _Schedule2.default.saveMessage(msg_id = msg_id, msg_type = msg_type, text = text, source = source, agent = agent, serviceUrl = serviceUrl, user_client_id = user_client_id, user_client_name = user_client_name, bot_client_id = bot_client_id, bot_client_name = bot_client_name, channel_id = channel_id, conversation_id = conversation_id, orientation = orientation, time = time);
}

var ExtractMiddleware = function () {
    function ExtractMiddleware() {
        _classCallCheck(this, ExtractMiddleware);
    }

    _createClass(ExtractMiddleware, [{
        key: "receive",
        value: function receive(event, next) {
            ExtractUser(event);
            ExtractMessage(event, ORIENTATION_INCOMING);
            next();
        }
    }, {
        key: "send",
        value: function send(event, next) {
            ExtractMessage(event, ORIENTATION_OUTGOING);
            next();
        }
    }]);

    return ExtractMiddleware;
}();

exports.default = ExtractMiddleware;
//# sourceMappingURL=ExtractMiddleware.js.map