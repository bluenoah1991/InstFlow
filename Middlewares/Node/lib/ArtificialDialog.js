"use strict";

require("babel-polyfill");

var _nodeUuid = require("node-uuid");

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _botbuilder = require("botbuilder");

var _Schedule = require("./Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

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

module.exports = function () {
    var lib = new _botbuilder.Library('artificial');

    lib.dialog('/', function (session, args) {
        if (session.message.text != undefined && session.message.text.trim().toUpperCase() == 'Q') {
            session.send('Exit the Artificial Service.');
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
        session.send('InstFlow Artificial Service (Enter Q exit):');
        session.replaceDialog('/', {
            referer: '/start'
        });
    });

    return lib;
};
//# sourceMappingURL=ArtificialDialog.js.map