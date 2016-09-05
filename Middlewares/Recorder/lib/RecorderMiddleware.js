"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("babel-polyfill");

var _Schedule = require("./Schedule");

var _Schedule2 = _interopRequireDefault(_Schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecorderMiddleware = function () {
    function RecorderMiddleware() {
        _classCallCheck(this, RecorderMiddleware);
    }

    _createClass(RecorderMiddleware, [{
        key: "receive",
        value: function receive(event, next) {
            var channel_id = event.address.channelId;
            var user_id = event.address.user.id;
            var name = event.address.user.name;
            var extra = null;
            if (event.address != undefined) {
                extra = JSON.stringify(event.address);
            }
            _Schedule2.default.saveUser(channel_id, user_id, name, extra);
            next();
        }
    }]);

    return RecorderMiddleware;
}();

exports.default = RecorderMiddleware;
//# sourceMappingURL=RecorderMiddleware.js.map