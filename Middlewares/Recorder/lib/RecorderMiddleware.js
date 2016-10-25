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

function RecordUser(event) {
    var channel_id = event.address.channelId;
    var user_id = event.address.user.id;
    var name = event.address.user.name;
    var extra = null;
    if (event.address != undefined) {
        extra = JSON.stringify(event.address);
    }
    _Schedule2.default.saveUser(channel_id, user_id, name, extra);
}

function RecordMessage(event, orientation) {
    var msg_id = _nodeUuid2.default.v1();
    var text = event.text;
    var msg_type = event.type;
    var source = event.source;
    var agent = event.agent;
    var user_id = event.address.user.id;
    var user_name = event.address.user.name;
    var channel_id = event.address.channelId;
    var conversation_id = event.address.conversation.id;
    var bot_client_id = event.address.bot.id;
    var bot_client_name = event.address.bot.name;
    var time = new Date().getTime();
    _Schedule2.default.saveMessage(msg_id = msg_id, text = text, msg_type = msg_type, source = source, agent = agent, user_id = user_id, user_name = user_name, channel_id = channel_id, conversation_id = conversation_id, bot_client_id = bot_client_id, bot_client_name = bot_client_name, orientation = orientation, time = time);
}

var RecorderMiddleware = function () {
    function RecorderMiddleware() {
        _classCallCheck(this, RecorderMiddleware);
    }

    _createClass(RecorderMiddleware, [{
        key: "receive",
        value: function receive(event, next) {
            RecordUser(event);
            RecordMessage(event, ORIENTATION_INCOMING);
            next();
        }
    }, {
        key: "send",
        value: function send(event, next) {
            RecordMessage(event, ORIENTATION_OUTGOING);
            next();
        }
    }]);

    return RecorderMiddleware;
}();

exports.default = RecorderMiddleware;
//# sourceMappingURL=RecorderMiddleware.js.map